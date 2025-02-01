import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../../application/user/UserService';
import { SQLiteUserRespository } from '../../infrastructure/repositories/SQLiteUserRepository';
import { verifyToken } from '../../lib/middlewares';

const userRouter: Router = Router();
const userRepository = new SQLiteUserRespository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', verifyToken, userController.getUserById);
userRouter.put('/:id', verifyToken, userController.updateUserUsername);
userRouter.put(
    '/:id/score',
    verifyToken,
    userController.updateUserCurrentScore
);
userRouter.put(
    '/:id/current-month-score',
    userController.updateUserCurrentMonthScore
);
userRouter.delete('/:id', verifyToken, userController.deleteUser);

export { userRouter };
