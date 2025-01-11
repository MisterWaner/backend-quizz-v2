import { Router } from 'express';
import { mathRouter } from './MathQuizRouter';
import { userRouter } from './UserRouter';
import { authRouter } from './AuthRouter';
import { scoreRouter } from './ScoreRouter';

const router: Router = Router();

router.use('/math', mathRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/score', scoreRouter);

export default router;
