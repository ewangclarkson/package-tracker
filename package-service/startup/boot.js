const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
const packageApis = require('../routes/packages');
const error = require('../middleware/error.handler');
const specs = require('../swagger');
const swaggerUi = require('swagger-ui-express');

module.exports = function (app) {
    app.use(express.json());
    app.use(helmet());
    app.use(compression());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.use('/api/packages', packageApis);
    app.use(error);
};