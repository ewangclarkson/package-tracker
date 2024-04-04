const {describe, it, expect} = require('@jest/globals');
const winston = require('winston');
const errorHandler = require('../../../middleware/error.handler');


describe('Errors', () => {
    it('should return 500 internal server error', () => {
        winston.error = jest.fn();
        const resp = {
            status: jest.fn((y) => ({status: y, send: jest.fn(x => ({status: y, body: x}))})),
            send: jest.fn((y) => ({body: y, status: jest.fn(x => ({status: x, body: y}))})),
        };
        const result = errorHandler({message: "internal server error occured"}, {}, resp, jest.fn());

        expect(result.status).toEqual(500);
        expect(result.body).not.toBeNull();
    })

});