import { UserRepository } from '../../domain/user/UserRepository';
import { User } from '../../domain/user/User';
import { comparePassword } from '../../lib/helpers';

export class AuthService {
    constructor(private userRepository: UserRepository) {}

    async registerUser(username: string, password: string): Promise<User> {
        const user = await User.register(username, password);
        await this.userRepository.register(user);
        return user;
    }

    async loginUser(username: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByUsername(username);

        if (!user) return null;

        const isPasswordCorrect: boolean = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordCorrect) return null;

        return user;
    }

}