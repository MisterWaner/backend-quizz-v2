import { Request, Response } from 'express';
import { UserService } from '../../application/user/UserService';
import { User } from '../../domain/user/User';

export class UserController {
    constructor(private userService: UserService) {}

    getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users: User[] | null = await this.userService.getUsers();

            if (!users) {
                res.status(404).json({
                    message: 'Aucun utilisateur trouvé',
                });
                return;
            }

            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message: 'Erreur lors de la récupération des utilisateurs',
            });
        }
    };

    getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    message: "L'id est manquant",
                });
                return;
            }

            const user: User | null = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({
                    message: 'Utilisateur non trouvé',
                });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message: "Erreur lors de la récupération de l'utilisateur",
            });
        }
    };

    updateUserUsername = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { username } = req.body as User;

            if (!username) {
                res.status(400).json({
                    message: "Le nom d'utilisateur est manquant",
                });
                return;
            }
            const user: User | null = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({
                    message: 'Utilisateur non trouvé',
                });
                return;
            }

            const updatedUser = await this.userService.updateUsername(
                id,
                username
            );

            res.status(200).json({
                user: updatedUser,
                message: 'Utilisateur mis à jour',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message: "Erreur lors de la mise à jour du nom d'utilisateur",
            });
        }
    };

    updateUserCurrentScore = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const { currentScore } = req.body as User;

            if (!id || !currentScore) {
                res.status(400).json({
                    message: "L'id ou le score est manquant",
                });
                return;
            }

            const user: User | null = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({
                    message: 'Utilisateur non trouvé',
                });
                return;
            }

            const updatedUser = await this.userService.updateUserCurrentScore(
                id,
                currentScore
            );

            res.status(200).json({
                user: updatedUser,
                message: 'Score mis à jour avec succès',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message: 'Erreur lors de la mise à jour du score',
            });
        }
    };

    updateUserCurrentMonthScore = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const { id } = req.body as User;

            if (!id) {
                res.status(400).json({
                    message: "L'id est manquant",
                });
                return;
            }

            const user: User | null = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({
                    message: 'Utilisateur non trouvé',
                });
                return;
            }

            const updatedUser =
                await this.userService.updateUserCurrentMonthScore(
                    id,
                    user.currentScore,
                    user.currentMonthScore
                );

            res.status(200).json({
                user: updatedUser,
                message: 'Score du mois courant mis à jour avec succès',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message:
                    'Erreur lors de la mise à jour du score du mois courant',
            });
        }
    };

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    message: "L'id est manquant",
                });
                return;
            }

            await this.userService.deleteUser(id);

            res.status(200).json({
                message: 'Utilisateur supprimé',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message: "Erreur lors de la suppression de l'utilisateur",
            });
        }
    };
}
