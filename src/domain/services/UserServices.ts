import sql from 'better-sqlite3';
import { hashPassword, getNanoid } from '../../lib/helpers';
import { User } from '../types';

const db = sql('quizz.db');

export class UserService {
    fetchUsers(): User[] {
        return db.prepare('SELECT * FROM users').all() as User[];
    }

    fetchUserById(id: string): User {
        return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User;
    }
    
    async getUsers(): Promise<User[] | undefined> {
        try {
            const users: User[] = this.fetchUsers();

            if (users.length === 0) throw new Error('Aucun utilisateur trouvé');

            return users;
        } catch (error) {
            console.log(error);
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }
    }

    async getUserById(id: string): Promise<User | undefined> {
        try {
            const user: User = this.fetchUserById(id);

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

    async updateUserScore(
        id: string,
        score: number
    ): Promise<User | undefined> {
        try {
            const user = this.getUserById(id);

            if (!user) throw new Error('Utilisateur inexistant');

            if (score < 0) throw new Error('Score incorrect');

            db.prepare('UPDATE users SET score = score + ? WHERE id = ?').run(
                score,
                id
            );

            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Erreur lors de la mise à jour du score');
        }
    }

    async updateUserCurrentMonthScore(
        id: string,
        score: number,
        currentMonthScore: number
    ): Promise<User | undefined> {
        try {
            const user = this.getUserById(id);

            if (!user) throw new Error('Utilisateur inexistant');

            const updatedMonthScore = currentMonthScore + score;

            if (updatedMonthScore < 0) throw new Error('Score incorrect');

            db.prepare(
                'UPDATE users SET currentMonthScore = ?, score = 0 WHERE id = ?'
            ).run(updatedMonthScore, id);

            return user;
        } catch (error) {
            console.log(error);
            throw new Error(
                'Erreur lors de la mise à jour du score du mois courant'
            );
        }
    }
}
