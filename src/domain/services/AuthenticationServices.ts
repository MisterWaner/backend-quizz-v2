import sql from 'better-sqlite3';
import { hashPassword, comparePassword, getNanoid } from '../../lib/helpers';
import { User } from '../types';

const db = sql('quizz.db');

export class AuthenticationService {
    async registerUser(username: string, password: string): Promise<User | null> {
        try {
            const hashedPassword: string = await hashPassword(password);
            const newUser: User = {
                id: await getNanoid(),
                username,
                password: hashedPassword,
                isRegistered: 1,
                score: 0,
                currentMonthScore: 0,
                lastMonthScore: 0,
            };

            const userExists = db
                .prepare('SELECT * FROM users WHERE username = ?')
                .get(username);

            if (userExists) {
                throw new Error("Ce nom d'utilisateur existe déjà");
            }

            db.prepare(
                'INSERT INTO users (id, username, password, isRegistered) VALUES (?, ?, ?, ?)'
            ).run(
                newUser.id,
                newUser.username,
                newUser.password,
                newUser.isRegistered
            );

            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la création de l'utilisateur");
        }
    }

    async authenticateUser(
        username: string,
        password: string
    ): Promise<User | null> {
        try {
            const user: User = db
                .prepare('SELECT * FROM users WHERE username = ?')
                .get(username) as User;

            if (!user) throw new Error('Utilisateur inexistant');

            const isPasswordCorrect: boolean = await comparePassword(
                password,
                user.password
            );

            if (!isPasswordCorrect) throw new Error('Identifiants incorrects');

            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de l'authentification");
        }
    }
}
