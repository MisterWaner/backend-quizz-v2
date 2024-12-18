import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import router from './infrastructure/routes/index';

config();

const app = express();

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders:
            'Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization',
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('API démarrée et fonctionnelle');
});

app.use('/', router);

export default app;
