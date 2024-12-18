import { Router } from 'express';
import {mathRouter} from './MathQuizRouter';

const router: Router = Router();

router.use('/math', mathRouter);

export default router;