const winston = require('winston');
const HttpStatus = require('pk-common-lib');

module.exports = function (error, req, res, next) {
    winston.error(error.message, error);
    console.log(error)
    return res.status(HttpStatus.INTERNAL_SERVER).send('Something failed')
};