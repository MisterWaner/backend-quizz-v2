import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRouter: Router = Router();
const userController = new UserController();

userRouter.post('/', userController.createUser);
userRouter.post('/login', userController.authenticateUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', userController.updateUserUsername);
userRouter.delete('/:id', userController.deleteUser);

export { userRouter };