import { Router } from 'express';
import { mathRouter } from './MathQuizRouter';
import { geographyRouter } from './GeographyQuizRouter';
import { userRouter } from './UserRouter';
import { authRouter } from './AuthRouter';
import { scoreRouter } from './ScoreRouter';

const router: Router = Router();

router.use('/math', mathRouter);
router.use('/geography', geographyRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/scores', scoreRouter);

export default router;
