import { Router } from 'express';
const authRouter = Router();
import {authLogin, keepAuth, resetPassword} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/verify.token';

authRouter.post('/', authLogin);
authRouter.get('/', verifyToken, keepAuth)
authRouter.patch('/reset-password', verifyToken, resetPassword)

export default authRouter;