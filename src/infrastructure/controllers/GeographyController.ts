import { Request, Response } from 'express';
import { QCMQuestion } from '../../domain/types';
import { generateEuropeanCapitalsQuestion } from '../../domain/services/GeographyQuizServices';

export const getEuropeanCapitals = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: QCMQuestion[] = Array.from(
        { length },
        generateEuropeanCapitalsQuestion
    );
    res.json(questions);
}