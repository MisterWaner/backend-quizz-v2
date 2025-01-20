import { Router } from 'express';
import {
    getUsers,
    getUserById,
    updateUserUsername,
    updateUserScore,
    updateUserCurrentMonthScore,
    deleteUser,
} from '../controllers/UserController';
import { verifyToken } from '../../lib/middlewares';

const userRouter: Router = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', verifyToken, getUserById);
userRouter.put('/:id', verifyToken, updateUserUsername);
userRouter.put('/:id/score', verifyToken, updateUserScore);
userRouter.put('/:id/current-month-score', updateUserCurrentMonthScore);
userRouter.delete('/:id', verifyToken, deleteUser);

export { userRouter };
