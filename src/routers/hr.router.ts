import { Router } from "express";
const hrRouter = Router();
import { createUser } from "../controllers/hr.controller";
import { verifyToken } from "../middlewares/verify.token";
import { verifyRole } from "../middlewares/verify.role";

hrRouter.post('/create-user', verifyToken, verifyRole, createUser);

export default hrRouter;