const winston = require('winston');
const {Loggly} = require('winston-loggly-bulk');

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: 'PackageTracker:api-gateway' },
    transports: [
        new winston.transports.File({ filename: './logging/logs.log',  handleExceptions: true}),
        new Loggly({token: "5111d89f-dde5-4214-9e1e-00de70939e44", subdomain: "fonexpress", tags: ["Winston-NodeJS"], json: true})
    ],
});
module.exports = logger;