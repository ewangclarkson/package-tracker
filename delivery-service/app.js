const express = require('express');
const app = express();
const logger = require('./logging/logger');
const config = require('config');
const db = require('./startup/database');
const http = require('http');
const {Server} = require('socket.io');


let io;
const startServer = function () {

    db.connect()
        .then(() => console.log(`You have successfully connected to database`))
        .catch(() => new Error("Failed to connect to mongoDB"));

    const server = http.createServer(app);

     io = require("socket.io")(server, {
        cors: {
            origin: config.get("origin"),
        }
    });


    require('./sockets/delivery.socket')(io);
    require('./startup/boot')(app);

    process.on("uncaughtException",
        (exp) => logger.error(exp.message, exp));

    const port = process.env.PORT || config.get('app.port');
    return server.listen(port, () => console.log(`Listening ${config.get('name')} on port ${port}`));
};

const server = startServer();

module.exports = {server,io};