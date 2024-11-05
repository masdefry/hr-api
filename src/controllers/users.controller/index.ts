import { NextFunction, Request, Response } from 'express';
import { createProfileService, findProfileService, updateProfileService } from '../../services/users.service';
import { deleteFiles } from '../../utils/delete.files';
import { IReqVerifyToken } from '../../middlewares/verify.token';

export const createProfile = async(req: IReqVerifyToken, res: Response, next: NextFunction) => {
    try {
        const imagesUploaded = req?.files
        const {birthDate, phoneNumber, address} = req.body
        const {usersId} = req.auth
        await createProfileService({imagesUploaded, birthDate, phoneNumber, address, usersId})
    
        res.status(201).json({
            error: false, 
            message: 'Create Profile Success', 
            data: {
                birthDate, 
                phoneNumber, 
                address
            }
        })
    } catch (error) {
        deleteFiles({imagesUploaded: req.files})
        next(error)
    }
}

export const findProfile = async(req: IReqVerifyToken, res: Response, next: NextFunction) => {
    try {
        const {usersId} = req.auth 

        const userProfile = await findProfileService({usersId})

        res.status(200).json({
            error: false, 
            message: 'Get Profile Success', 
            data: userProfile
        })
    } catch (error) {
        next(error)
    }
}

export const updateProfile = async(req: IReqVerifyToken, res: Response, next: NextFunction) => {
    try {
        const {birthDate, address, phoneNumber} = req.body
        const {usersId} = req.auth 
        const imagesUploaded = req.files;

        await updateProfileService({usersId, birthDate, address, phoneNumber, imagesUploaded})
    
        res.status(200).json({
            error: false, 
            message: 'Update Profile Success', 
            data: {birthDate, address, phoneNumber}
        })
    } catch (error) {
        next(error)
    }
}