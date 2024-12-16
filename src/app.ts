import express, { Request, Response } from 'express';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.get('/', (req: Request, res: Response) => {
    res.send('API démarrée et fonctionnelle');
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
