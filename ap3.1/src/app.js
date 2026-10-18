const path = require('node:path');
const express = require('express');

const logger = require('./middlewares/logger.middleware');
const produtosRoutes = require('./modules/produtos/produtos.routes');
const fornecedoresRoutes = require('./modules/fornecedores/fornecedores.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'));
app.use('/produtos', produtosRoutes);
app.use('/fornecedores', fornecedoresRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
