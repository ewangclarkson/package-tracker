const express = require('express');
const app = express();
const logger = require('./logging/logger');
const config = require('config');
const db = require('./startup/database');

const startServer = function () {

    db.connect()
        .then(() => console.log(`You have successfully connected to database`))
        .catch(() => new Error("Failed to connect to mongoDB"));

    require('./startup/boot')(app);
    process.on("uncaughtException",
        (exp) =>logger.error(exp.message, exp));

    const port = process.env.PORT || 8001;
    return app.listen(port, () => logger.info(`Listening ${config.get('name')} on port ${port}`));
};

const server = startServer();

module.exports = server;