import sql from 'better-sqlite3';
import { hashPassword, getNanoid } from '../../lib/helpers';
import { User } from '../types';

const db = sql('quizz.db');

export class UserService {
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
