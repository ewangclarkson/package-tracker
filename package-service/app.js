const {RPCObserver} = require("./brokers/rpc");

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

    RPCObserver("PACKAGE_SERVICE_QUEUE")
        .then(() => console.log("consume success"))
        .catch((err) => "Error occurred while saving the data");


    process.on("uncaughtException",
        (exp) => logger.error(exp.message, exp));

    const port = process.env.PORT || config.get("app.port");
    return app.listen(port, () => console.log(`Listening ${config.get('name')} on port ${port}`));
};

const server = startServer();

module.exports = server;