const app = require('./app');
const { initDb } = require('./db');

const PORT = process.env.PORT || 3001;

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`irrigation-service écoute sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base :', err.message);
    process.exit(1);
  });