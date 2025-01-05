import { Router } from 'express';
import { mathRouter } from './MathQuizRouter';
import { userRouter } from './UserRouter';
import { authRouter } from './AuthRouter';

const router: Router = Router();

router.use('/math', mathRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
