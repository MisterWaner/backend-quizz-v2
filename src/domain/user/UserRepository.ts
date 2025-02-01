import { User } from './User';

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    register(user: User): Promise<void>;
    updateUsername(id: string, username: string): Promise<void>;
    updateUserCurrentScore(id: string, score: number): Promise<void>;
    updateUserCurrentMonthScore(
        id: string,
        score: number,
        currentMonthScore: number
    ): Promise<void>;
    delete(id: string): Promise<void>;
}
