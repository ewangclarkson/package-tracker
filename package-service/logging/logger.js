const winston = require('winston');
const {Loggly} = require('winston-loggly-bulk');

winston.add(new Loggly({
    token: "5111d89f-dde5-4214-9e1e-00de70939e44",
    subdomain: "fonexpress",
    tags: ["Winston-NodeJS"],
    json: true
}));

