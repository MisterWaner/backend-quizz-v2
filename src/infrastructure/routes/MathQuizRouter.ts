import { Router, Request, Response } from 'express';
import {
    getAddition,
    getSubstraction,
    getMultiplication,
    getRandomCalculation,
} from '../controllers/MathQuizController';

const mathRouter: Router = Router();

mathRouter.get('/addition',getAddition);
mathRouter.get('/soustraction', getSubstraction);
mathRouter.get('/multiplication', getMultiplication);
mathRouter.get('/random', getRandomCalculation);

export { mathRouter };
