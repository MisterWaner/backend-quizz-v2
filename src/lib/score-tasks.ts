import cron from 'node-cron';
import { UserService } from '../domain/services/UserServices';
import sql from 'better-sqlite3';

const db = sql('quizz.db');
const userService = new UserService();

// Update the current month score of all users every day at midnight
cron.schedule('0 0 * * *', () => {
    const users = userService.fetchUsers();

    users.forEach((user) => {
        db.prepare(
            'UPDATE users SET currentMonthScore = currentMonthScore + score, score = 0 WHERE id = ?'
        ).run(user.id);
    });
});

// update month scores every month at the beginning of the month
cron.schedule('0 0 1 * *', () => {
    const users = userService.fetchUsers();

    users.forEach((user) => {
        if (user.lastMonthScore === 0) {
            db.prepare(
                'UPDATE users SET lastMonthScore = currentMonthScore + lastMonthScore WHERE id = ?'
            ).run(user.id);
            db.prepare(
                'UPDATE users SET currentMonthScore = 0 WHERE id = ?'
            ).run(user.id);
        } else {
            db.prepare(
                'UPDATE users SET lastMonthScore = currentMonthScore WHERE id = ?'
            ).run(user.id);
            db.prepare(
                'UPDATE users SET currentMonthScore = 0 WHERE id = ?'
            ).run(user.id);
        }
    });
    console.log('Scores mensuels réinitialisés');
});
