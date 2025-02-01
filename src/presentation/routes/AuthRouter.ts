import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../../application/auth/AuthService';
import { SQLiteUserRespository } from '../../infrastructure/repositories/SQLiteUserRepository';

const authRouter: Router = Router();
const authRepository = new SQLiteUserRespository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/register', authController.createUser);
authRouter.post('/login', authController.loginUser);
authRouter.post('/logout', authController.logoutUser);

export { authRouter };