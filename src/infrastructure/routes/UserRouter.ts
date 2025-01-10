import { NextFunction, Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken } from '../../lib/middlewares';

const userRouter: Router = Router();
const userController = new UserController();

const verifyTokenWrapper = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    verifyToken(req, res, next)
        .then(() => next())
        .catch(next);
};

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', verifyTokenWrapper, userController.getUserById);
userRouter.put('/:id', verifyTokenWrapper, userController.updateUserUsername);
userRouter.put(
    '/:id/score',
    verifyTokenWrapper,
    userController.updateUserScore
);
userRouter.put(
    '/:id/current-month-score',
    verifyTokenWrapper,
    userController.updateUserCurrentMonthScore
);
userRouter.delete('/:id', verifyTokenWrapper, userController.deleteUser);

export { userRouter };
