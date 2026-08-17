import { Router } from "express";
import { register, login , forgotPassword, resetPassword, changePassword} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login',login);

authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);

authRouter.put('/change-passowrd', authenticateToken, changePassword);

export { authRouter}