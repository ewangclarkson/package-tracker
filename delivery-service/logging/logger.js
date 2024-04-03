const winston = require('winston');
const {Loggly} = require('winston-loggly-bulk');
const config = require('config');

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: 'PackageTracker:package-service' },
    transports: [
        new winston.transports.File({ filename: './logging/logs.log',  handleExceptions: true}),
        new Loggly({token: config.get('loggly.token'), subdomain: "fonexpress", tags: [""], json: true})
    ],
});
module.exports = logger;