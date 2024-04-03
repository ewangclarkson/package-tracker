const express = require('express');
const app = express();
const logger = require('./logging/logger');
const config = require('config');
const proxy = require('express-http-proxy');
const cors = require('cors');


const packageServiceHost = config.get('service.package');
const deliveryServiceHost = config.get('service.delivery');


const startServer = function () {

    app.use(express.json);
    app.use(cors());

    app.use("/package-service", proxy(packageServiceHost));
    app.use(("/delivery-service", proxy(deliveryServiceHost)));

    process.on("uncaughtException",
        (exp) => logger.error(exp.message, exp));

    const port = process.env.PORT || 8001;
    return app.listen(port, () => logger.info(`Listening ${config.get('name')} on port ${port}`));
};


startServer();
