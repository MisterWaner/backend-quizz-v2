import { Request, Response } from 'express';
import { QCMQuestion } from '../../domain/types';
import { generateEuropeanCapitalsQuestion, generateAfricanCapitalsQuestion, generateAmericanCapitalsQuestion, generateOceanicCapitalsQuestion, generateAsianCapitalsQuestion, generateRandomCapitalsQuestion } from '../../domain/services/GeographyQuizServices';

export const getEuropeanCapitals = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: QCMQuestion[] = Array.from(
        { length },
        generateEuropeanCapitalsQuestion
    );
    res.json(questions);
}

export const getAfricanCapitals = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: QCMQuestion[] = Array.from(
        { length },
        generateAfricanCapitalsQuestion
    );
    res.json(questions);
}

export const getAmericanCapitals = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: QCMQuestion[] = Array.from(
        { length },
        generateAmericanCapitalsQuestion
    );
    res.json(questions);
}

export const getOceanicCapitals = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: QCMQuestion[] = Array.from(
        { length },
        generateOceanicCapitalsQuestion
    );
    res.json(questions);
}

export const getAsianCapitals = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: QCMQuestion[] = Array.from(
        { length },
        generateAsianCapitalsQuestion
    );
    res.json(questions);
}

export const getRandomCapitals = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: QCMQuestion[] = Array.from(
        { length },
        generateRandomCapitalsQuestion
    );
    res.json(questions);
}