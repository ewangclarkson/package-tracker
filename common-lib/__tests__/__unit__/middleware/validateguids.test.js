const {describe, it, expect} = require('@jest/globals');
const {validGUIDS} = require('../../../middleware/validateguids');
const HttpStatus = require('../../../http/http.status');
const mongoose = require('mongoose');

describe('ObjectIds', () => {
    it('should return 500 internal server error if the id is not a valid UUID', () => {
        const resp = {
            status: jest.fn((y) => ({status: y, send: jest.fn(x => ({status: y, body: x}))})),
            send: jest.fn((y) => ({body: y, status: jest.fn(x => ({status: x, body: y}))})),
        };

        const result = validGUIDS({params: {id: '1'}}, resp, jest.fn());

        expect(result.status).toEqual(HttpStatus.INTERNAL_SERVER);
        expect(result.body).not.toBeNull();
    });

    it('should pass control to the next middleware if the UUID is valid', () => {
        mongoose.Types.ObjectId.isValid = jest.fn().mockImplementation(() => true);

        const resp = {
            status: jest.fn((y) => ({status: y, send: jest.fn(x => ({status: y, body: x}))})),
            send: jest.fn((y) => ({body: y, status: jest.fn(x => ({status: x, body: y}))})),
        };

        const next = jest.fn();

        validGUIDS({params: {id: '5ab9e7f0-9e30-4a25-b1b4-3d48b2e2f6ce'}}, resp, next);

        expect(next).toHaveBeenCalled();

    });

});