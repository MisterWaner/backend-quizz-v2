import { Router } from 'express';
import { AuthenticationController } from '../controllers/AuthenticationController';

const authenticationController = new AuthenticationController();

const authRouter: Router = Router();

authRouter.post('/register', authenticationController.register);
authRouter.post('/login', authenticationController.login);
authRouter.post('/logout', authenticationController.logout);

export { authRouter };