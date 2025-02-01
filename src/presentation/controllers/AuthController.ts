import { Request, Response } from 'express';
import { AuthService } from '../../application/auth/AuthService';
import { User } from '../../domain/user/User';
import { generateToken } from '../../lib/helpers';

export class AuthController {
    constructor(private authService: AuthService) {}

    createUser = async (req: Request, res: Response): Promise<void> => {
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

            const user: User = await this.authService.registerUser(
                username,
                password
            );
            res.status(201).json({
                user,
                message: 'Utilisateur créé avec succès',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message: "Erreur lors de la création de l'utilisateur",
            });
        }
    };

    loginUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body as User;

            if (!username || !password) {
                res.status(400).json({
                    message:
                        "Le mot de passe ou le nom d'utilisateur est manquant",
                });
                return;
            }

            const user: User | null =
                await this.authService.loginUser(username, password);

            if (!user) {
                res.status(401).json({
                    message: 'Utilisateur ou mot de passe incorrect',
                });
                return;
            } else {
                const token: string = await generateToken(user);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 3600000,
                });
                res.header('');
                res.status(200).json({
                    token,
                    message: 'Authentification réussie',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message: "Erreur lors de l'authentification",
            });
        }
    };

    logoutUser = async (req: Request, res: Response): Promise<void> => {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({
                message: 'Déconnexion réussie',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message: 'Erreur lors de la déconnexion',
            });
        }
    }
}
