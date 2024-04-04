const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const bcrypt = require('bcrypt');
const userRepository = require('../repository/user.repository');
const config = require('config');
const {generateToken} = require('pk-common-lib/middleware/auth')


const userService = {

    async registerUser(userRequest) {
        return userRepository.create(userRequest);
    },

    async updateUpdateById(id, userRequest) {
        return userRepository.findByIdAndUpdate(id, {
                $set: userRequest
            },
            {new: true}
        );
    },
    async getUserById(id) {
        return userRepository.findById(id);
    },

    async getUserByEmail(email) {
        return userRepository.findOne({email: email})
    },
    async generateEncryptedPassword(password) {
        const saltRounds = parseInt(config.get('bcrypt.salt'));
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hash(password, salt);

    },
    async authenticateUser(unHashedPassword, userPassword) {
        return bcrypt.compare(unHashedPassword, userPassword);
    },

    async generateJwtToken(user) {
        return generateToken(user)

    }
};

const validate = {
    create: function (userRequest) {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
            phoneNumber: Joi.number().required(),
        });

        return schema.validate(userRequest);
    },
    update: function (userRequest) {
        const schema = Joi.object({
            name: Joi.string().required(),
            password: Joi.string().min(4).required(),
            phoneNumber: Joi.number().required(),
        });

        return schema.validate(userRequest);
    },
    login: function (loginRequest) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
        });

        return schema.validate(loginRequest);
    },
}

module.exports = {userService, validate};
