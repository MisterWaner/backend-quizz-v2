import { Request, Response } from 'express';
import { UserService } from '../../domain/services/UserServices';
import { User } from '../../domain/types';

const userService = new UserService();

export class UserController {
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body as User;
            const confirmation: string = req.body.confirmation;

            if (!username || !password) {
                res.status(400).json({
                    message:
                        "Le mot de passe ou le nom d'utilisateur est manquant",
                });
                return;
            }

            if (confirmation !== password) {
                res.status(400).json({
                    message: 'Les mots de passe ne correspondent pas',
                });
                return;
            }

            const user: User = await userService.createUser(
                username,
                password
            );
            res.status(201).json({
                user,
                message: 'Utilisateur créé avec succès',
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Erreur lors de la création de l'utilisateur",
            });
            console.log(error);
        }
    }

    async authenticateUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body as User;

            if (!username || !password) {
                res.status(400).json({
                    message:
                        "Le mot de passe ou le nom d'utilisateur est manquant",
                });
                return;
            }

            const user: User | undefined = await userService.authenticateUser(
                username,
                password
            );

            if (!user) {
                res.status(401).json({
                    message: 'Utilisateur ou mot de passe incorrect',
                });
                return;
            }

            res.status(200).json({
                user,
                message: 'Authentification réussie',
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Erreur lors de l'authentification",
            });
            console.log(error);
        }
    }
}
