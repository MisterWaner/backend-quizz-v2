import bcrypt from 'bcrypt'
import { config } from 'dotenv';

config();

// Generates a random string of characters
export const getNanoid = async () => {
    const { nanoid } = await import('nanoid');
    return nanoid();
}

// Mixes the different options of a multiple choice question
export function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

// Hash password with bcrypt
export const hashPassword = async (password: string): Promise<string> => {
    const salt: number = Number(process.env.BCRYPT_SALT)
    const hashedPassword: string = await bcrypt.hash(password, salt);

    return hashedPassword;
}

// Compares the password with the hashed password
const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashed);
}