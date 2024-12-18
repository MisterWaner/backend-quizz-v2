import {
    generateRandomAddition,
    generateRandomSubstraction,
    generateRandomMultiplication,
    generateRandomCalculation,
} from '../../domain/services/MathQuizServices';
import { Request, Response } from 'express';
import { Question } from '../../domain/types';

export const getAddition = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: Question[] = Array.from(
        { length },
        generateRandomAddition
    );
    res.json(questions);
};

export const getSubstraction = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: Question[] = Array.from(
        { length },
        generateRandomSubstraction
    );
    res.json(questions);
};

export const getMultiplication = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: Question[] = Array.from(
        { length },
        generateRandomMultiplication
    );
    res.json(questions);
};

export const getRandomCalculation = (req: Request, res: Response): void => {
    const length: number = 10;
    const questions: Question[] = Array.from(
        { length },
        generateRandomCalculation
    );
    res.json(questions);
};
