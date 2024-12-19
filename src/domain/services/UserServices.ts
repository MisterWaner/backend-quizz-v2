import sql from 'better-sqlite3';
import { hashPassword, getNanoid } from '../../lib/helpers';
import { User } from '../types';
//import { getNanoid } from "../../lib/helpers";

const db = sql('quizz.db');

export class UserService {
    async createUser(username: string, password: string): Promise<User> {
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
                'INSERT INTO users (id, username, password, isRegistered, score, currentMonthScore, lastMonthScore) VALUES (?, ?, ?, ?, ?, ?, ?)'
            ).run(
                newUser.id,
                newUser.username,
                newUser.password,
                newUser.isRegistered,
                newUser.score,
                newUser.currentMonthScore,
                newUser.lastMonthScore
            );

            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error('Erreur lors de la création de l\'utilisateur');
        }
    }
}
