import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';

config();

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.token || req.headers['authorization'];

    if (!token) {
        return next(new Error("Vous n'êtes pas autorisé à effectuer cette action"));
    }

    try {
        const secret: string = process.env.JWT_SECRET || '';
        const decoded = jwt.verify(token, secret);
        (req as any).user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
