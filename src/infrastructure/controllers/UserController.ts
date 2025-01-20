import { Request, Response } from 'express';
import sql from 'better-sqlite3';
import { User } from '../../domain/types';

const db = sql('quizz.db');

export function fetchUsers(): User[] {
    return db.prepare('SELECT * FROM users').all() as User[];
}

export function fetchUserById(id: string): User {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User;
}

async function getUsers(req: Request, res: Response): Promise<void> {
    try {
        const users: User[] = fetchUsers();

        if (users.length === 0) {
            res.status(404).json({
                message: 'Aucun utilisateur trouvé',
            });
            return;
        }

        res.status(200).json(users);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: 'Erreur lors de la récupération des utilisateurs',
        });
        return;
    }
}

async function getUserById(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                message: "L'id est manquant",
            });
            return;
        }

        const user: User = fetchUserById(id);

        if (!user) {
            res.status(404).json({
                message: 'Utilisateur non trouvé',
            });
            return;
        }

        res.status(200).json(user);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Erreur lors de la récupération de l'utilisateur",
        });
        return;
    }
}

async function updateUserUsername(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { username } = req.body as User;

        if (!username) {
            res.status(400).json({
                message: "Le nom d'utilisateur est manquant",
            });
            return;
        }

        const user: User | null = fetchUserById(id);

        if (!user) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }

        const userExists = db
            .prepare('SELECT * FROM users WHERE username = ?')
            .get(username);

        if (userExists) {
            res.status(400).json({
                message: "Ce nom d'utilisateur existe déjà",
            });
            return;
        }

        const updatedUser = db
            .prepare('UPDATE users SET username = ? WHERE id = ?')
            .run(username, id);

        res.status(200).json(updatedUser);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Erreur lors de la mise à jour du nom d'utilisateur",
        });
        return;
    }
}

async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                message: "L'id est manquant",
            });
            return;
        }

        const user: User | null = fetchUserById(id);

        if (!user) {
            res.status(404).json({
                message: 'Utilisateur non trouvé',
            });
            return;
        }

        db.prepare('DELETE FROM users WHERE id = ? AND isRegistered = ?').run(
            id,
            1
        );

        res.status(200).json({
            message: 'Utilisateur supprimé',
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Erreur lors de la suppression de l'utilisateur",
        });
        return;
    }
}

async function updateUserScore(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { score } = req.body as User;

        if (!id || !score) {
            res.status(400).json({
                message: "L'id ou le score est manquant",
            });
            return;
        }

        const user: User | null = fetchUserById(id);

        if (!user) {
            res.status(404).json({
                message: 'Utilisateur non trouvé',
            });
            return;
        }

        if (score < 0) throw new Error('Score incorrect');

        const updatedUser = db
            .prepare('UPDATE users SET score = score + ? WHERE id = ?')
            .run(score, id);

        res.status(200).json(updatedUser);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: 'Erreur lors de la mise à jour du score',
        });
        return;
    }
}

async function updateUserCurrentMonthScore(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const { id } = req.body as User;

        if (!id) {
            res.status(400).json({
                message: "L'id est manquant",
            });
            return;
        }

        const user: User | null = fetchUserById(id);

        if (!user) {
            res.status(404).json({
                message: 'Utilisateur non trouvé',
            });
            return;
        }

        const updatedMonthScore = user.currentMonthScore + user.score;

        const updatedUser = db
            .prepare(
                'UPDATE users SET currentMonthScore = ? , score = 0 WHERE id = ?'
            )
            .run(updatedMonthScore, id);

        res.status(200).json({
            updatedUser,
            message: 'Score du mois courant mis à jour avec succès',
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: 'Erreur lors de la mise à jour du score du mois courant',
        });
        return;
    }
}

export {
    getUsers,
    getUserById,
    updateUserUsername,
    updateUserScore,
    updateUserCurrentMonthScore,
    deleteUser,
};
