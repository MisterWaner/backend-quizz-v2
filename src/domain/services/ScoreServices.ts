import sql from 'better-sqlite3';
import { User } from '../types';

const db = sql('quizz.db');

export class ScoreService {
    fetchUsersDailyScore(): User[] {
        return db
            .prepare('SELECT username, score FROM users ORDER BY score DESC')
            .all() as User[];
    }

    fetchUsersMonthlyScore(): User[] {
        return db
            .prepare('SELECT username, currentMonthScore FROM users ORDER BY currentMonthScore DESC')
            .all() as User[];
    }

    fetchTop5DailyScore(): User[] {
        return db
            .prepare('SELECT username, score FROM users ORDER BY score DESC LIMIT 5')
            .all() as User[];
    }

    fetchTop5MonthlyScore(): User[] {
        return db
            .prepare(
                'SELECT username, currentMonthScore FROM users ORDER BY currentMonthScore DESC LIMIT 5'
            )
            .all() as User[];
    }

    async getUsersDailyScore(): Promise<User[] | undefined> {
        try {
            const users: User[] = this.fetchUsersDailyScore();

            if (users.length === 0) throw new Error('Aucun utilisateur trouvé');

            return users;
        } catch (error) {
            console.log(error);
            throw new Error('Erreur lors de la récupération des scores');
        }
    }

    async getUsersMonthlyScore(): Promise<User[] | undefined> {
        try {
            const users: User[] = this.fetchUsersMonthlyScore();

            if (users.length === 0) throw new Error('Aucun utilisateur trouvé');

            return users;
        } catch (error) {
            console.log(error);
            throw new Error('Erreur lors de la récupération des scores');
        }
    }

    async getTop5DailyScore(): Promise<User[] | undefined> {
        try {
            const users: User[] = this.fetchTop5DailyScore();

            if (users.length === 0) throw new Error('Aucun utilisateur trouvé');

            return users;
        } catch (error) {
            console.log(error);
            throw new Error('Erreur lors de la récupération des scores');
        }
    }

    async getTop5MonthlyScore(): Promise<User[] | undefined> {
        try {
            const users: User[] = this.fetchTop5MonthlyScore();

            if (users.length === 0) throw new Error('Aucun utilisateur trouvé');

            return users;
        } catch (error) {
            console.log(error);
            throw new Error('Erreur lors de la récupération des scores');
        }
    }
}
