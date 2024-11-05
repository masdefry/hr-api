import { Router } from 'express';
const cloudinaryRouter = Router();
import { uploadFilesTest, deleteFilesTest } from '../controllers/cloudinary.controller';
import { uploadMulter } from '../utils/multer';
import { verifyUploader } from './../middlewares/verify.uploader';

cloudinaryRouter.post('/', uploadMulter({storageType: 'disk'}).fields([{name: 'images', maxCount: 3}]), verifyUploader, uploadFilesTest);
cloudinaryRouter.delete('/:imageUrl', deleteFilesTest);

export default cloudinaryRouter;