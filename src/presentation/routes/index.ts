import { Router } from 'express';
import { userRouter } from './UserRoutes';
import { authRouter } from './AuthRouter';

const router: Router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;