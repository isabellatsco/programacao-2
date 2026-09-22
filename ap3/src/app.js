const express = require('express');

const logger = require('./middlewares/logger.middleware');
const siteRoutes = require('./routes/site.routes');
const produtosRoutes = require('./routes/produtos.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(logger);
app.use(express.json());

app.use('/', siteRoutes);
app.use('/produtos', produtosRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
