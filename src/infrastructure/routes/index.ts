import { Router } from 'express';
import { mathRouter } from './MathQuizRouter';
import { userRouter } from './UserRouter';

const router: Router = Router();

router.use('/math', mathRouter);
router.use('/users', userRouter);

export default router;
