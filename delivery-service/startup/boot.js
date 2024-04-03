const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
const deliveryApis = require('../routes/deliveries');
const error = require('../middleware/error.handler');
const specs = require('../swagger');
const swaggerUi = require('swagger-ui-express');

module.exports = function (app) {
    app.use(express.json());
    app.use(helmet());
    app.use(compression());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.use('/api/deliveries', deliveryApis);
    app.use(error);
};