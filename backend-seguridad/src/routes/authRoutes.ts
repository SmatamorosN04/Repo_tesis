import { Router } from "express";
import { register, login , forgotPassword, resetPassword,getMe,  changePassword} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login',login);

authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);

authRouter.get('/me', authenticateToken, getMe)
authRouter.put('/change-password', authenticateToken, changePassword);

export { authRouter}