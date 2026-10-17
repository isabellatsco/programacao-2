const express = require('express');

const logger = require('./middlewares/logger.middleware');
const aeronavesRoutes = require('./modules/voos/aeronaves.routes');
const passageirosRoutes = require('./modules/voos/passageiros.routes');
const voosRoutes = require('./modules/voos/voos.routes');
const cartoesEmbarqueRoutes = require('./modules/voos/cartoes-embarque.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(logger);
app.use(express.json());

app.use('/api/aeronaves', aeronavesRoutes);
app.use('/api/passageiros', passageirosRoutes);
app.use('/api/voos', voosRoutes);
app.use('/api/cartoes-embarque', cartoesEmbarqueRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
