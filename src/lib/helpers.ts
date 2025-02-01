import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { IUser } from '../domain/types';

config();

// Generates a random string of characters
export const getNanoid = async () => {
    const { nanoid } = await import('nanoid');
    return nanoid();
};

// Mixes the different options of a multiple choice question
export function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

// Hash password with bcrypt
export const hashPassword = async (password: string): Promise<string> => {
    const salt: number = Number(process.env.BCRYPT_SALT);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    return hashedPassword;
};

// Compares the password with the hashed password
export const comparePassword = async (
    password: string,
    hashed: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashed);
};

// Generates a token for the user
export const generateToken = async (
    user: IUser | undefined
): Promise<string> => {
    const maxAge: number = 3600000; // 1 hour
    const secret: string = process.env.JWT_SECRET || '';
    const token = jwt.sign(
        {
            id: user?.id,
            username: user?.username,
            isRegistered: user?.isRegistered,
            score: user?.currentScore,
            currentMonthScore: user?.currentMonthScore,
            lastMonthScore: user?.lastMonthScore,
        },
        secret,
        {
            expiresIn: maxAge,
        }
    );

    return token;
};
