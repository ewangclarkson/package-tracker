const {describe, expect, it, beforeAll} = require("@jest/globals");
const {userService, validate} = require('../../../../domain/service/user.service');
const userRepository = require('../../../../domain/repository/user.repository');

jest.mock('../../../../domain/repository/user.repository');

let users;
describe('user service', () => {

    beforeEach(() => {
        users = [
            {
                name: "Nasa Vallery",
                email: "ewangclarks@gmail.com",
                password: "12345",
                phoneNumber: 673676301
            },
            {
                name: "Nasah Kuma",
                email: "ewangclarks@gmail.com",
                password: "12345",
                phoneNumber: 673676302
            }
        ];
    });

    it('should register a new user', async () => {
        const newUser = {
            name: "Ewang Clarkson",
            email: "ewangclarks@gmail.com",
            password: "12345",
            phoneNumber: 673676309
        };

        userRepository.create.mockImplementation(() => users[1]);
        const dbUser = await userService.registerUser(newUser);

        expect(userRepository.create).toHaveBeenCalledWith(newUser);
        expect(dbUser).toMatchObject(users[1]);
    });


    it('should get a user by ID', async () => {
        userRepository.findById.mockImplementation(() => users[0]);
        const dbUser = await userService.getUserById("9e304a25b1b43d48b2e2f6ce");
        expect(userRepository.findById).toHaveBeenCalledWith("9e304a25b1b43d48b2e2f6ce");
        expect(dbUser).toMatchObject(users[0]);

    });

    it('should update a user by ID', async () => {
        const newUser = {
            name: "Ewang Clarkson",
            password: "12345",
            phoneNumber: 673676309
        };

        userRepository.findByIdAndUpdate.mockImplementationOnce(() => users[1]);
        const dbUser = await userService.updateUpdateById("9e304a25b1b43d48b2e2f6ce", newUser);
        expect(userRepository.findByIdAndUpdate.mock.calls[0][0]).toEqual("9e304a25b1b43d48b2e2f6ce");
        expect(dbUser).toMatchObject(users[1]);
    });

});

describe('validateUser', () => {

    it('should throw an error if the inputs are invalid', () => {
        const newUser = {};
        const {value, error} = validate.create(newUser);
        expect(error).not.toBeNull();
    });


    it('should validate the user with success and populate the database', () => {
        const newUser = {
            name: "Ewang Clarkson",
            email: "ewangclarks@gmail.com",
            password: "12345",
            phoneNumber: 673676309
        };

        const {value, error} = validate.create(newUser);
        expect(error).toBeUndefined();
        expect(value).toMatchObject(newUser);
    });

})

