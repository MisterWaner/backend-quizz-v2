import sql from 'better-sqlite3';

const db = new sql('quizz.db');

export function initDB() {
    db.exec(
        'CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT UNIQUE, password TEXT, isRegistered INTEGER, score INTEGER DEFAULT 0, currentMonthScore INTEGER DEFAULT 0, lastMonthScore INTEGER DEFAULT 0)'
    );
    console.log('DB created');
}
