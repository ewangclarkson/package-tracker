const express = require('express');
const app = express();
const logger = require('./logging/logger');
const config = require('config');
const proxy = require('express-http-proxy');
const cors = require('cors');
const compression = require("compression");
const helmet = require("helmet");


const packageServiceHost = config.get('service.package');
const deliveryServiceHost = config.get('service.delivery');
const userServiceHost = config.get('service.user');
const webHost = config.get('service.web');


const startServer = function () {

    app.use(express.json());
    app.use(helmet({contentSecurityPolicy: false}));
    app.use(compression());
    app.use(cors());

    app.use("/package-service", proxy(packageServiceHost));
    app.use("/delivery-service", proxy(deliveryServiceHost));
    app.use("/user-service", proxy(userServiceHost));
    app.use("/", proxy(webHost));

    process.on("uncaughtException",
        (exp) => logger.error(exp.message, exp));

    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Listening ${config.get('name')} on port ${port}`));
};


startServer();
