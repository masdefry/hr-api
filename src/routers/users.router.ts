import { createProfile, findProfile, updateProfile } from '../controllers/users.controller';
import { Router } from 'express';
const usersRouter = Router();
import { verifyUploader } from '../middlewares/verify.uploader';
import { verifyToken } from '../middlewares/verify.token';
import { createProfileValidator } from '../middlewares/validator/create.profile.validator';
import { expressValidatorErrorHandling } from '../middlewares/validator/express.validator.error.handling';
import { uploadMulter } from '../utils/multer';

usersRouter.post('/', verifyToken, uploadMulter({storageType: 'disk'}).fields([{name: 'images', maxCount: 3}]), verifyUploader, createProfileValidator, expressValidatorErrorHandling, createProfile);
usersRouter.get('/', verifyToken, findProfile)
usersRouter.put('/', verifyToken, uploadMulter({storageType: 'disk'}).fields([{name: 'images', maxCount: 3}]), verifyUploader, updateProfile)

export default usersRouter;