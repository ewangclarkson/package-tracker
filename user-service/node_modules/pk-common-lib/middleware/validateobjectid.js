const mongoose = require('mongoose');
const HttpStatus = require('../http/http.status');


const validObjectId = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(HttpStatus.INTERNAL_SERVER).send("Invalid object id")
    }
    next();
};

module.exports ={
    validObjectId
}