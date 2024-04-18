const mongoose = require('mongoose');
const HttpStatus = require('../http/http.status');
const { v4: uuidv4, validate: validateUUID } = require('uuid');


const validGUIDS = function (req, res, next) {
    if (!validateUUID(req.params.id)) {
        return res.status(HttpStatus.INTERNAL_SERVER).send("Invalid UUID id")
    }
    next();
};

module.exports ={
    validGUIDS
}