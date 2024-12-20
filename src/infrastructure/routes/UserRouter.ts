import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRouter: Router = Router();
const userController = new UserController();

userRouter.post('/', userController.createUser);
userRouter.post('/login', userController.authenticateUser);

export { userRouter };