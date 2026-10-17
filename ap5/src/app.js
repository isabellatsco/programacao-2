const express = require('express');

const logger = require('./middlewares/logger.middleware');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(logger);
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

module.exports = app;
