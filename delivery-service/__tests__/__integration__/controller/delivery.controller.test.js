const {describe, beforeEach, afterEach, it, expect, afterAll} = require('@jest/globals');
const request = require('supertest');
const {connect, disconnect} = require('../../../startup/database');
const deliveryRepository = require('../../../domain/repository/delivery.repository');
const HttpStatus = require('pk-common-lib/http/http.status');
const {server} = require('../../../app');
const {generateToken} = require('pk-common-lib/middleware/auth');
const {deliveryService, validate} = require('../../../domain/service/delivery.service');
const rpc = require('../../../brokers/rpc');

jest.mock('../../../brokers/rpc');
jest.mock('pk-common-lib/service/location.service');


let token;
describe("/api/delivery", () => {

    beforeEach(async () => {
        let deliveries = [
            {
                package_id: "0892f3f0-d4b9-4e2c-9331-54fc531c9cd5",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 109,
                    lng: 89
                },
                status: "open"
            },
            {
                package_id: "64fdfcd7-48fe-4dd9-801b-5ea926997490",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 200,
                    lng: 400
                },
                status: "open"
            }
        ];

        token = await generateToken({
            _id: "615af9a616d3bb001e0d5e2f",
            name: "Nasa Vallery",
            email: "ewangclarks@gmail.com",
            phoneNumber: 673676301,
            roles: ['USER', 'DRIVER', 'ADMIN'],
        });

        await deliveryRepository.insertMany(deliveries);


    });

    afterEach(async () => {
        await deliveryRepository.deleteMany({});
        server.close()
    });

    afterAll(() => disconnect());

    describe('GET /', () => {
        it('should return a list of deliveries', async () => {
            const resp = await request(server).get('/api/delivery')
                .set("Authorization", "Bearer " + token);
            expect(resp.status).toBe(HttpStatus.SUCCESS);

            expect(resp.body.length).toEqual(2);
            expect(resp.body.some((p) => p.status === 'open')).toBeTruthy();
        });

    });
    describe('GET /:id', () => {
        it('should return a 404 status code if the delivery does not exist', async () => {
            const resp = await request(server).get('/api/delivery/d80f88f0-c44f-48f6-87b9-20db2f9adf25').set("Authorization", "Bearer " + token);
            ;
            expect(resp.status).toBe(HttpStatus.NOT_FOUND);
        });

        it('should return the delivery with a status code of 200', async () => {
            const deliveryObj = await deliveryRepository.create({
                package_id: "886d097d-eaef-474e-8d4b-ffc7212c3f27",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            });

            const resp = await request(server).get(`/api/delivery/${deliveryObj.delivery_id}`).set("Authorization", "Bearer " + token);
            ;
            expect(resp.status).toBe(HttpStatus.SUCCESS);
            expect(resp.body.description).toEqual(deliveryObj.description);
        });
    });

    describe('DELETE /:id', () => {

        it('should return 404 if the given id does not exist', async () => {
            const resp = await request(server).delete(`/api/delivery/d80f88f0-c44f-48f6-87b9-20db2f9adf25`).set("Authorization", "Bearer " + token);
            ;
            expect(resp.status).toEqual(HttpStatus.NOT_FOUND);
        });

        it('should delete the delivery and return 200 status code', async () => {
            const deliveryObj = await deliveryRepository.create({
                package_id: "07c517f0-720c-4de5-aca6-8216440ff6dc",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            });
            const resp = await request(server).delete(`/api/delivery/${deliveryObj.delivery_id}`).set("Authorization", "Bearer " + token);
            ;
            expect(resp.status).toEqual(HttpStatus.SUCCESS);
        });
    });

    describe('POST /', () => {

        beforeEach(() => {
            jest.mock('../../../domain/service/delivery.service');
        });

        it('should return status code 400 if validation fails', async () => {

            const deliveryObj = {
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            };

            deliveryService.createDelivery = jest.fn().mockImplementation(() => ({
                package_id: "0892f3f0-d4b9-4e2c-9331-54fc531c9cd5",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 109,
                    lng: 89
                },
                status: "open"
            }));
            const resp = await request(server).post('/api/delivery').send(deliveryObj).set("Authorization", "Bearer " + token);
            expect(resp.status).toBe(HttpStatus.BAD_REQUEST);

        });

        it('should return status code 201 and create delivery', async () => {
            const deliveryObj = {
                package_id: "07c517f0-720c-4de5-aca6-8216440ff6dc",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            };

            deliveryService.createDelivery = jest.fn().mockImplementation(() => ({
                package_id: "0892f3f0-d4b9-4e2c-9331-54fc531c9cd5",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 109,
                    lng: 89
                },
                status: "open"
            }));
            const resp = await request(server).post('/api/delivery').send(deliveryObj).set("Authorization", "Bearer " + token);
            expect(resp.status).toBe(HttpStatus.CREATED);
        });
    });


    describe('PUT /:id', () => {
        beforeEach(() => {
            jest.mock('../../../domain/service/delivery.service');
        });
        it('should return status code 404 if delivery does not exist', async () => {
            const deliveryObj = {
                package_id: "07c517f0-720c-4de5-aca6-8216440ff6dc",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            };
            deliveryService.updateDeliveryById = jest.fn().mockImplementationOnce(() => ({
                package_id: "0892f3f0-d4b9-4e2c-9331-54fc531c9cd5",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 109,
                    lng: 89
                },
                status: "open"
            }));
            const resp = await request(server).put('/api/delivery/07c517f0-720c-4de5-aca6-8216440ff6dc').send(deliveryObj).set("Authorization", "Bearer " + token);

            expect(resp.status).toBe(HttpStatus.NOT_FOUND);

        });

        it('should update the delivery if the id is valid', async () => {
            let newDelivery = {
                package_id: "bae9fc7a-4cb5-467f-9f7c-1c5c4d23591b",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            };

            const deliveryObj = await deliveryRepository.create(newDelivery);

            deliveryService.updateDeliveryById = jest.fn().mockImplementationOnce(() => ({
                package_id: "0892f3f0-d4b9-4e2c-9331-54fc531c9cd5",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 109,
                    lng: 89
                },
                status: "open"
            }));

            const resp = await request(server).put(`/api/delivery/${deliveryObj.delivery_id}`).send({
                ...newDelivery,
                status: 'open'
            }).set("Authorization", "Bearer " + token);

            expect(resp.status).toBe(HttpStatus.SUCCESS);
        });
        it('should return status code 400 if validation fails', async () => {
            const newDelivery = {
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            };
            const deliveryObj = await deliveryRepository.create({
                ...newDelivery,
                package_id: "0fa5c333-530d-4872-82e9-afce4795bff3",
            });

            deliveryService.updateDeliveryById = jest.fn().mockImplementationOnce(() => ({
                package_id: "0892f3f0-d4b9-4e2c-9331-54fc531c9cd5",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 109,
                    lng: 89
                },
                status: "open"
            }));

            const resp = await request(server).put('/api/delivery/' + deliveryObj.delivery_id).send(deliveryObj).set("Authorization", "Bearer " + token);
            expect(resp.status).toBe(HttpStatus.BAD_REQUEST);

        });

    });
});