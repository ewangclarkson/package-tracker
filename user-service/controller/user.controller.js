const {userService, validate} = require('../domain/service/user.service');
const _ = require("lodash");
const HttpStatus = require('pk-common-lib/http/http.status');
const config = require('config');

const UserController = {

    async getAuthUser(req, res) {
        return res.status(HttpStatus.SUCCESS).send(req.user);
    },

    async registerUser(req, res) {
        const {value, error} = validate.create(req.body);
        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)
        };

        const user = await userService.getUserByEmail(req.body.email);
        if (user) {
            return res.status(HttpStatus.ALREADY_EXIST).send('This user already exist in the system')
        }

        const userRequest = {
            name: req.body.name,
            email: req.body.email,
            password: await userService.generateEncryptedPassword(req.body.password),
            phoneNumber: parseInt(req.body.phoneNumber),
            roles: ['USER']
        };

        const newUser = await userService.registerUser(userRequest);

        return res.status(HttpStatus.CREATED).send(_.pick(newUser, ['_id', 'name', 'email', 'phoneNumber']));
    },

    async updateUser(req, res) {
        const {value, error} = validate.update(req.body);
        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)
        }

        const exist = await userService.getUserById(req.params.id);
        if (!exist) {
            return res.status(HttpStatus.NOT_FOUND).send("Could not find the user with the given id")
        }

        const userRequest = {
            name: req.body.name,
            password: await userService.generateEncryptedPassword(req.body.password),
            phoneNumber: req.body.phoneNumber,
            roles: req.body.roles
        };

        const newUser = userService.updateUpdateById(req.params.id, userRequest);
        return res.status(HttpStatus.SUCCESS).send(_.pick(newUser, ['_id', 'name', 'email', 'phoneNumber', 'roles']));
    },

    async login(req, res) {

        const {value, error} = validate.login(req.body);
        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)
        }

        const user = await userService.getUserByEmail(req.body.email);
        if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).send('invalid user email or password')
        }

        const match = await userService.authenticateUser(req.body.password, user.password);
        if (!match) {
            return res.status(HttpStatus.UNAUTHORIZED).send('invalid user email or password')
        }

        const userDetails = _.pick(user, ['_id', 'name', 'email', 'phoneNumber', 'roles']);
        const token = await userService.generateJwtToken(userDetails);
        const currentDate = new Date();
        const expiry = config.get('jwt.expiresIn');
        const expiresIn= new Date(currentDate.getTime() + (parseInt(expiry.charAt(0)) * 60 * 60 * 1000));

        return res.status(HttpStatus.SUCCESS).send({
            accessToken: token,
            userDetails: userDetails,
            expiresIn: expiresIn
        });
    }

};

module.exports = UserController;