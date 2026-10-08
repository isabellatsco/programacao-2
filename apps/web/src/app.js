const express = require('express');

const logger = require('./middlewares/logger.middleware');
const siteRoutes = require('./routes/site.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(logger);

app.use('/', siteRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
