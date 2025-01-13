import { Request, Response } from 'express';
import { UserService } from '../../domain/services/UserServices';
import { User } from '../../domain/types';

const userService = new UserService();

export class UserController {
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: User[] | null = await userService.getUsers();

            if (!users) {
                res.status(404).json({
                    message: 'Aucun utilisateur trouvé',
                });
                return;
            }

            res.status(200).json({
                users,
                message: 'Utilisateurs récupérés',
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: 'Erreur lors de la récupération des utilisateurs',
            });
            console.log(error);
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    message: "L'id est manquant",
                });
                return;
            }

            const user: User | null = await userService.getUserById(id);

            if (!user) {
                res.status(404).json({
                    message: 'Utilisateur non trouvé',
                });
                return;
            }

            res.status(200).json({
                user,
                message: 'Utilisateur récupéré',
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Erreur lors de la récupération de l'utilisateur",
            });
            console.log(error);
        }
    }

    async updateUserUsername(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { username } = req.body as User;

            if (!id || !username) {
                res.status(400).json({
                    message: "L'id ou le nom d'utilisateur est manquant",
                });
                return;
            }

            const user: User | null = await userService.updateUserUsername(
                id,
                username
            );

            if (!user) {
                res.status(404).json({
                    message: 'Utilisateur non trouvé',
                });
                return;
            }

            res.status(200).json({
                user,
                message: 'Utilisateur mis à jour',
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Erreur lors de la mise à jour du nom d'utilisateur",
            });
            console.log(error);
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    message: "L'id est manquant",
                });
                return;
            }

            await userService.deleteUser(id);

            res.status(200).json({
                message: 'Utilisateur supprimé',
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Erreur lors de la suppression de l'utilisateur",
            });
        }
    }

    async updateUserScore(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { score } = req.body as User;

            if (!id || !score) {
                res.status(400).json({
                    message: "L'id ou le score est manquant",
                });
                return;
            }

            const user: User | null = await userService.updateUserScore(
                id,
                score
            );

            if (!user) {
                res.status(404).json({
                    message: 'Utilisateur non trouvé',
                });
                return;
            }

            res.status(200).json({
                user,
                message: 'Score mis à jour avec succès',
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: 'Erreur lors de la mise à jour du score',
            });
            console.log(error);
        }
    }

    async updateUserCurrentMonthScore(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const { id } = req.params;
            const { score, currentMonthScore } = req.body as User;

            if (!id || !score || !currentMonthScore) {
                res.status(400).json({
                    message:
                        "L'id ou le score ou le score du mois courant est manquant",
                });
                return;
            }

            const user: User | null =
                await userService.updateUserCurrentMonthScore(
                    id,
                    score,
                    currentMonthScore
                );

            if (!user) {
                res.status(404).json({
                    message: 'Utilisateur non trouvé',
                });
                return;
            }

            res.status(200).json({
                user,
                message: 'Score du mois courant mis à jour avec succès',
            });
        } catch (error) {
            res.status(500).json({
                error,
                message:
                    'Erreur lors de la mise à jour du score du mois courant',
            });
            console.log(error);
        }
    }
}
