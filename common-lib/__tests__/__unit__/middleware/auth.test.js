const {describe, it, expect, beforeEach} = require('@jest/globals');
const {auth, driver, admin} = require('../../../middleware/auth');
const HttpStatus = require('../../../http/http.status');
const jwt = require('jsonwebtoken');

let res;
let req;
let next;

describe('Authentication and Authorization', () => {

    beforeEach(() => {
        req = {header: jest.fn().mockImplementation((x) => "")};
        res = {
            status: jest.fn((y) => ({status: y, send: jest.fn(x => ({status: y, body: x}))})),
            send: jest.fn((y) => ({body: y, status: jest.fn(x => ({status: x, body: y}))})),
        };
        next = jest.fn();
    });

    describe('Auth',() => {

        it('should send a 401 status code is authorization header not set', async () => {
            const resp = await auth(req, res, next);
            expect(resp.status).toBe(HttpStatus.FORBIDDEN);
        });

        it('it should send 403 status code if the token is invalid or has expired', async () => {
            let req = {header: jest.fn().mockImplementation(() => "Bearer 03850385093376096953")};
            //jwt.verify = jest.fn().mockImplementation(() => ({name:"ewangclarks",email:"ewangclarks@gmail.com",roles:["DRIVER","ADMIN"]}));
            jwt.verify = jest.fn().mockImplementation(() => null);
            const resp = await auth(req, res, next);
            expect(resp.status).toBe(HttpStatus.UNAUTHORIZED);
        });

        it('should pass control to tbe next middleware if the token is valid', async () => {
            let req = {header: jest.fn().mockImplementation(() => "Bearer 03850385093376096953")};
            jwt.verify = jest.fn().mockImplementation(() => ({
                name: "ewangclarks",
                email: "ewangclarks@gmail.com",
                roles: ["DRIVER", "ADMIN"]
            }));
            const resp = await auth(req, res, next);
            expect(next).toHaveBeenCalled();
        });

    });

    describe('Auth - DRIVER ROLE', () => {
        it('it should send 401 status code if user does not have driver role', async () => {
            let req = {user:{name: "ewangclarks", email: "ewangclarks@gmail.com", roles: ["ADMIN"]}};
            const resp = await driver(req, res, next);
            expect(resp.status).toBe(HttpStatus.UNAUTHORIZED);
        });
        it('it should call next if the user has the driver role', async () => {
            let req = {user:{name: "ewangclarks", email: "ewangclarks@gmail.com", roles: ["DRIVER"]}};
             await driver(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('Auth - ADMIN ROLE',  () => {

        it('it should send 401 status code if user is not an admin', async () => {
            let req = {user:{name: "ewangclarks", email: "ewangclarks@gmail.com", roles: ["DRIVER"]}};
            const resp =await admin(req, res, next);
            expect(resp.status).toBe(HttpStatus.UNAUTHORIZED);
        });

        it('it should call next if the user is an admin', async () => {
            let req = {user:{name: "ewangclarks", email: "ewangclarks@gmail.com", roles: ["ADMIN"]}};
            await admin(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

});