const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
const courses = require('../routes/courses');
const error = require('../middleware/error.handler');
const specs = require('../swagger');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
// const YAML = require('yaml');
// const file = fs.readFileSync('swagger.yaml', 'utf8');
// const swaggerDocument = YAML.parse(file);

module.exports = function (app) {
    app.use(express.json());
    app.use(express.static("public"));
    app.use(helmet());
    app.use(compression());
    app.set('views', './views');
    app.set('view engine', 'ejs');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
   // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/courses', courses);
    app.use(error);
};