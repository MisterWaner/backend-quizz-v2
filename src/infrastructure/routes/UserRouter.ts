import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken } from '../../lib/middlewares';

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', verifyToken, userController.getUserById);
userRouter.put('/:id', verifyToken, userController.updateUserUsername);
userRouter.put('/:id/score',verifyToken, userController.updateUserScore);
userRouter.put(
    '/:id/current-month-score',
    userController.updateUserCurrentMonthScore
);
userRouter.delete('/:id', verifyToken, userController.deleteUser);

export { userRouter };
