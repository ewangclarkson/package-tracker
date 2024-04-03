const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
require('express-async-errors');
const deliveryApis = require('../routes/deliveries');
const homeApis = require('../routes/home');
const error = require('../middleware/error.handler');
const specs = require('../swagger');
const swaggerUi = require('swagger-ui-express');

module.exports = function (app) {
    app.use(express.json());
    app.use(helmet());
    app.use(compression());
    app.use(cors());

    if (process.env.NODE_ENV !== 'production') app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.use('/api/delivery', deliveryApis);
    app.use('/',homeApis);
    app.use(error);
};