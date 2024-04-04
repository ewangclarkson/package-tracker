const {describe, beforeEach, afterEach, it, expect, afterAll} = require('@jest/globals');
const request = require('supertest');
const {connect, disconnect} = require('../../../startup/database');
const usersRepository = require('../../../domain/repository/user.repository');
const HttpStatus = require('pk-common-lib/http/http.status');
const {generateToken} = require('pk-common-lib/middleware/auth');
const {userService}= require('../../../domain/service/user.service');


let server;
let token;
let authUser;
let password;
describe("/api/users", () => {

    beforeEach(async () => {
        server = require('../../../app');
        const password = await userService.generateEncryptedPassword("12345");
        authUser = {
            _id: "615af9a616d3bb001e0d5e2f",
            name: "Nasa Vallery",
            email: "ewangclarks@gmail.com",
            phoneNumber: 673676301,
            roles: ['USER', 'DRIVER', 'ADMIN'],
        };
        token = await generateToken({
            _id: "615af9a616d3bb001e0d5e2f",
            name: "Nasa Vallery",
            email: "ewangclarks@gmail.com",
            phoneNumber: 673676301,
            roles: ['USER', 'DRIVER', 'ADMIN'],
        });

        const users = [
            {
                name: "Nasa Vallery",
                email: "fon@gmail.com",
                password: password,
                phoneNumber: 673676301
            },
            {
                name: "Nasah Kuma",
                email: "ewangclarks@gmail.com",
                password: password,
                phoneNumber: 673676302
            }
        ];
        await usersRepository.insertMany(users);
    });

    afterEach(async () => {
        await usersRepository.deleteMany({});
        server.close()
    });

    afterAll(() => disconnect());

    describe('GET /', () => {
        it('should return the current auth user', async () => {
            const resp = await request(server)
                .get('/api/users/me')
                .set("Authorization", "Bearer " + token);

            expect(resp.status).toBe(HttpStatus.SUCCESS);
            expect(resp.body).toMatchObject(authUser);
        });

    });

    describe('POST /', () => {
        it('should return status code 400 if validation fails', async () => {
            const userObj = {
                email: "harriet@gmail.com",
                password: "12345",
                phoneNumber: 673676301
            };
            const resp = await request(server).post('/api/users/register').send(userObj);
            expect(resp.status).toBe(HttpStatus.BAD_REQUEST);

        });

        it('should return status code 201 and register user', async () => {
            const userObj = {
                name: "Nasa Vallery",
                email: "harriet@gmail.com",
                password: "12345",
                phoneNumber: 673676321
            };
            const resp = await request(server).post('/api/users/register').send(userObj);
            expect(resp.status).toBe(HttpStatus.CREATED);
            expect(resp.body).toHaveProperty('phoneNumber', 673676321);
        });

        it("should login and generate a token successfully", async () => {
            const loginRequest = {
                email: "ewangclarks@gmail.com",
                password: "12345",
            };

            const resp = await request(server).post('/api/users/login').send(loginRequest);
            expect(resp.status).toBe(HttpStatus.SUCCESS);
            expect(resp.body).toHaveProperty('accessToken');
        })
    });


    describe('PUT /:id', () => {
        it('should return status code 404 if users does not exist', async () => {
            const userObj = {
                name: "Nasa Vallery",
                password: "12345",
                phoneNumber: 673676399
            };
            const resp = await request(server).put('/api/users/605a1e7d843de62e8c60b2cb')
                .send(userObj)
                .set("Authorization", "Bearer " + token);

            expect(resp.status).toBe(HttpStatus.NOT_FOUND);

        });

        it('should update the users if the id is valid', async () => {
            const newUser = {
                name: "Nasa Vallery",
                password: "12345",
                phoneNumber: 673676389
            };
            const userObj = await usersRepository.create(newUser);

            const resp = await request(server).put(`/api/users/${userObj._id}`)
                .send({
                    ...newUser,
                    name: 'Lobe serge'
                })
                .set("Authorization", "Bearer " + token);

            expect(resp.status).toBe(HttpStatus.SUCCESS);
        });
        it('should return status code 400 if validation fails', async () => {
            const newUser = {
                name: "Nasa Vallery",
                phoneNumber: 673676376
            };
            const userObj = await usersRepository.create({
                ...newUser,
                password: "12345",
            });

            const resp = await request(server).put('/api/users/' + userObj._id)
                .send(newUser)
                .set("Authorization", "Bearer " + token);
            expect(resp.status).toBe(HttpStatus.BAD_REQUEST);

        });

    });
});