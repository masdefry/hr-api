import { Request, Response, NextFunction } from 'express';
import { cloudinaryUpload } from '../../utils/cloudinary';
import { v2 as cloudinary} from 'cloudinary';

export const uploadFilesTest = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let files 

        if (req.files) {
            files = Array.isArray(req.files)
              ? req.files
              : req.files['images']

            const imagesUploaded = [] // Get Image Path and Image Filename to Store into DB
            for (const image of files!) {
                // Upload Each Image to Cloudinary
                const result = await cloudinaryUpload(image.path);
    
                imagesUploaded.push(result.res!); // Assuming `res` is Always Defined, Use Non-null Assertion
            }
          }
        
        

        res.status(201).json({
            error: false, 
            message: 'Upload Files Success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

export const deleteFilesTest = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {imageUrl} = req.params

        const result = await cloudinary.uploader.destroy(imageUrl);

        res.status(200).json({
            error: false, 
            message: 'Delete Files Success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}