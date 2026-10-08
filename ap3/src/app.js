const express = require('express');

const logger = require('./middlewares/logger.middleware');
const produtosRoutes = require('./modules/produtos/produtos.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(logger);
app.use(express.json());

app.use('/api/produtos', produtosRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
