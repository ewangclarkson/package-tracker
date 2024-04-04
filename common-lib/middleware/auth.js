const config = require('config');
const jwt = require('jsonwebtoken');
const HttpStatus = require('../http/http.status');

const privateKey = config.get('jwt.privateKey');
const expiresIn = config.get('jwt.expiresIn');

module.exports.auth = async (req, res, next) => {
    try {
        const tokenString = req.header("Authorization");
        if (tokenString.length === 0) return res.status(HttpStatus.FORBIDDEN).send("Access denied");

        const token = tokenString.replace("Bearer ", "");
        const user = await jwt.verify(token, privateKey, {expiresIn: expiresIn});

        if (!user) return res.status(HttpStatus.UNAUTHORIZED).send("Invalid user");

        req.user = user;

        next();
    } catch (exp) {
        return res.status(HttpStatus.INTERNAL_SERVER).send("An unexpected error occurred while authorizing user")
    }


}

module.exports.driver =async (req,res,next) =>{
    if(!req.user.roles.includes("DRIVER")) {
        return res.status(HttpStatus.UNAUTHORIZED).send("Unable to access resource due to authorization issues")
    }
    next();

}

module.exports.admin =async (req,res,next) =>{
    if(!req.user.roles.includes("ADMIN")) {
        return res.status(HttpStatus.UNAUTHORIZED).send("Unable to access resource due to authorization issues")
    }
    next();

}


module.exports.generateToken = async (user) => {
    return jwt.sign(user, privateKey, {expiresIn: expiresIn})
}