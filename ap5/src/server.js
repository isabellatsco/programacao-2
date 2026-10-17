require('dotenv').config({ quiet: true });

const app = require('./app');

if (!process.env.JWT_SECRET) {
  throw new Error('Defina JWT_SECRET no arquivo .env.');
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
