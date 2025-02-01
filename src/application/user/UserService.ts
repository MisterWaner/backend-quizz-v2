import { UserRepository } from '../../domain/user/UserRepository';
import { User } from '../../domain/user/User';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.findByUsername(username);
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async updateUsername(id: string, username: string): Promise<void> {
        await this.userRepository.updateUsername(id, username);
    }

    async updateUserCurrentScore(
        id: string,
        currentScore: number
    ): Promise<void> {
        await this.userRepository.updateUserCurrentScore(id, currentScore);
    }

    async updateUserCurrentMonthScore(
        id: string,
        score: number,
        currentMonthScore: number
    ): Promise<void> {
        await this.userRepository.updateUserCurrentMonthScore(
            id,
            score,
            currentMonthScore
        );
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
