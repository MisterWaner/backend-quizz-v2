import { Request, Response } from 'express';
import { ScoreService } from '../../domain/services/ScoreServices';
import { User } from '../../domain/types';

const scoreService = new ScoreService();

export class ScoreController {
    async getUsersDailyScore(req: Request, res: Response): Promise<void> {
        try {
            const users: User[] | undefined = await scoreService.getUsersDailyScore();

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

    async getUsersMonthlyScore(req: Request, res: Response): Promise<void> {
        try {
            const users: User[] | undefined = await scoreService.getUsersMonthlyScore();

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

    async getTop5DailyScore(req: Request, res: Response): Promise<void> {
        try {
            const users: User[] | undefined = await scoreService.getTop5DailyScore();

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

    async getTop5MonthlyScore(req: Request, res: Response): Promise<void> {
        try {
            const users: User[] | undefined = await scoreService.getTop5MonthlyScore();

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
}