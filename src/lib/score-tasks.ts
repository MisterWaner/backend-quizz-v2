import cron from 'node-cron';
import { fetchUsers } from '../infrastructure/controllers/UserController';
import sql from 'better-sqlite3';

const db = sql('quizz.db');

// Update the current month score of all users every day at midnight
cron.schedule('0 0 * * *', () => {
    const users = fetchUsers();

    users.forEach((user) => {
        db.prepare(
            'UPDATE users SET currentMonthScore = currentMonthScore + score, score = 0 WHERE id = ?'
        ).run(user.id);
    });
});

// update month scores every month at the beginning of the month
cron.schedule('0 0 1 * *', () => {
    const users = fetchUsers();

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
