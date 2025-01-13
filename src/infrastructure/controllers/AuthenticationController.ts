import { Request, Response } from 'express';
import { AuthenticationService } from '../../domain/services/AuthenticationServices';
import { User } from '../../domain/types';
import { generateToken } from '../../lib/helpers';

const authenticationService = new AuthenticationService();

export class AuthenticationController {
    async register(req: Request, res: Response): Promise<void> {
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

            const user: User | null = await authenticationService.registerUser(
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

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body as User;
           
            if (!username || !password)
                res.status(400).json({
                    message:
                        "Le mot de passe ou le nom d'utilisateur est manquant",
                });

            const user: User | null =
                await authenticationService.authenticateUser(
                    username,
                    password
                );

            if (!user)
                res.status(401).json({
                    message: 'Utilisateur ou mot de passe incorrect',
                });
            else {
                const token: string = await generateToken(user);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 3600000,
                });
                res.header('')
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
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({
                message: 'Déconnexion réussie',
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: 'Erreur lors de la déconnexion',
            });
            console.log(error);
        }
    }
}
