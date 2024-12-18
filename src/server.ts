import app from './app';

const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});