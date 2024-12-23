import sql from 'better-sqlite3';
import { hashPassword, comparePassword, getNanoid } from '../../lib/helpers';
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
            throw new Error("Erreur lors de la création de l'utilisateur");
        }
    }

    async authenticateUser(
        username: string,
        password: string
    ): Promise<User | undefined> {
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

    async getUsers(): Promise<User[] | undefined> {
        try {
            const users: User[] = db
                .prepare('SELECT * FROM users')
                .all() as User[];

            if (users.length === 0) throw new Error('Aucun utilisateur trouvé');

            return users;
        } catch (error) {
            console.log(error);
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }
    }

    async getUserById(id: string): Promise<User | undefined> {
        try {
            const user: User = db
                .prepare('SELECT * FROM users WHERE id = ?')
                .get(id) as User;

            if (!user) throw new Error('Utilisateur inexistant');

            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la récupération de l'utilisateur");
        }
    }

    async updateUserUsername(
        id: string,
        username: string
    ): Promise<User | undefined> {
        try {
            const user = this.getUserById(id);

            if (!user) throw new Error('Utilisateur inexistant');

            const userExists = db
                .prepare('SELECT * FROM users WHERE username = ?')
                .get(username);

            if (userExists) {
                throw new Error("Ce nom d'utilisateur existe déjà");
            }

            db.prepare('UPDATE users SET username = ? WHERE id = ?').run(
                username,
                id
            );

            return user;
        } catch (error) {
            console.log(error);
            throw new Error(
                "Erreur lors de la mise à jour du nom d'utilisateur"
            );
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            const user = this.getUserById(id);

            if (!user) throw new Error('Utilisateur inexistant');

            db.prepare(
                'DELETE FROM users WHERE id = ? AND isRegistered = ?'
            ).run(id, 1);

            return;
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la suppression de l'utilisateur");
        }
    }
}
