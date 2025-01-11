import { Router } from 'express';
import { ScoreController } from '../controllers/ScoreController';

const scoreController = new ScoreController();
const scoreRouter: Router = Router();

scoreRouter.get('/daily', scoreController.getUsersDailyScore);
scoreRouter.get('/monthly', scoreController.getUsersMonthlyScore);
scoreRouter.get('/daily-five', scoreController.getTop5DailyScore);
scoreRouter.get('/monthly-five', scoreController.getTop5MonthlyScore);

export { scoreRouter };