const express = require('express');

const logger = require('./middlewares/logger.middleware');
const produtosRoutes = require('./modules/produtos/produtos.routes');
const fornecedoresRoutes = require('./modules/produtos/fornecedores.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(logger);
app.use(express.json());

app.use('/api/produtos', produtosRoutes);
app.use('/api/fornecedores', fornecedoresRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
