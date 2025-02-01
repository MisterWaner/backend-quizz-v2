import { User } from '../../domain/user/User';
import { UserRepository } from '../../domain/user/UserRepository';
import { hashPassword } from '../../lib/helpers';

import { db } from '../database/sqlite';

export class SQLiteUserRespository implements UserRepository {
    
    async register(user: User): Promise<void> {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;

        db.prepare(
            'INSERT INTO users (id, username, password, isRegistered, score, currentMonthScore, lastMonthScore) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).run(
            user.id,
            user.username,
            user.password,
            user.isRegistered,
            user.currentScore,
            user.currentMonthScore,
            user.lastMonthScore
        );
    }

    async findById(id: string): Promise<User | null> {
        const user = db
            .prepare('SELECT * FROM users WHERE id = ?')
            .get(id) as User;
        if (!user) return null;
        return new User(
            user.id,
            user.username,
            user.password,
            user.isRegistered,
            user.currentScore,
            user.currentMonthScore,
            user.lastMonthScore
        );
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = db
            .prepare('SELECT * FROM users WHERE username = ?')
            .get(username) as User;
        if (!user) return null;
        return new User(
            user.id,
            user.username,
            user.password,
            user.isRegistered,
            user.currentScore,
            user.currentMonthScore,
            user.lastMonthScore
        );
    }

    async findAll(): Promise<User[]> {
        const users = db.prepare('SELECT * FROM users').all() as User[];
        return users;
    }

    async updateUsername(id: string, username: string): Promise<void> {
        const user = this.findById(id);

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
    }

    async updateUserCurrentScore(id: string, currentScore: number): Promise<void> {
        const user = this.findById(id);

        if (!user) throw new Error('Utilisateur inexistant');

        if (currentScore < 0) throw new Error('Score incorrect');

        db.prepare('UPDATE users SET score = score + ? WHERE id = ?').run(
            currentScore,
            id
        );
    }

    async updateUserCurrentMonthScore(
        id: string,
        score: number,
        currentMonthScore: number
    ): Promise<void> {
        const user = this.findById(id);

        if (!user) throw new Error('Utilisateur inexistant');

        const updatedMonthScore = currentMonthScore + score;

        if (updatedMonthScore < 0) throw new Error('Score incorrect');

        db.prepare(
            'UPDATE users SET currentMonthScore = ?, score = 0 WHERE id = ?'
        ).run(updatedMonthScore, id);
    }

    async delete(id: string): Promise<void> {
        db.prepare('DELETE FROM users WHERE id = ? AND isRegistered = ?').run(
            id,
            1
        );
    }
}
