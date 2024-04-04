const {describe, beforeEach, afterEach, it, expect, afterAll} = require('@jest/globals');
const request = require('supertest');
const {connect, disconnect} = require('../../../startup/database');
const deliveryRepository = require('../../../domain/repository/delivery.repository');
const HttpStatus = require('pk-common-lib/http/http.status');
const {server} = require('../../../app');



describe("/api/delivery", () => {

    beforeEach(async () => {
        let deliveries = [
            {
                package_id: "7bd04177afccd02c49b2520e",
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
                package_id: "17824b128ee41eb86d8e66c5",
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
        await deliveryRepository.insertMany(deliveries);
    });

    afterEach(async () => {
        await deliveryRepository.deleteMany({});
        server.close()
    });

    afterAll(() => disconnect());

    describe('GET /', () => {
        it('should return a list of deliveries', async () => {
            const resp = await request(server).get('/api/delivery');
            expect(resp.status).toBe(HttpStatus.SUCCESS);
            expect(resp.body.length).toEqual(2);
            expect(resp.body.some((p) => p.status === 'open')).toBeTruthy();
        });

    });
    describe('GET /:id', () => {
        it('should return a 404 status code if the delivery does not exist', async () => {
            const resp = await request(server).get('/api/delivery/6609af6e87555f3d88a34147');
            expect(resp.status).toBe(HttpStatus.NOT_FOUND);
        });

        it('should return the delivery with a status code of 200', async () => {
            const deliveryObj = await deliveryRepository.create({
                package_id: "88d2498facc1691b26106222",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            });

            const resp = await request(server).get(`/api/delivery/${deliveryObj.delivery_id}`);
            expect(resp.status).toBe(HttpStatus.SUCCESS);
            expect(resp.body.description).toEqual(deliveryObj.description);
        });
    });

    describe('DELETE /:id', () => {

        it('should return 404 if the given id does not exist', async () => {
            const resp = await request(server).delete(`/api/delivery/6609af6e87555f3d88a34147`);
            expect(resp.status).toEqual(HttpStatus.NOT_FOUND);
        });

        it('should delete the delivery and return 200 status code', async () => {
            const deliveryObj = await deliveryRepository.create({
                package_id: "605a1e7d843de62e8c60b2cb",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            });
            const resp = await request(server).delete(`/api/delivery/${deliveryObj.delivery_id}`);
            expect(resp.status).toEqual(HttpStatus.SUCCESS);
        });
    });

    describe('POST /', () => {
        it('should return status code 400 if validation fails', async () => {
            const deliveryObj =  {
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            };

            const resp = await request(server).post('/api/delivery').send(deliveryObj);
            expect(resp.status).toBe(HttpStatus.BAD_REQUEST);

        });

        it('should return status code 201 and create delivery', async () => {
            const deliveryObj =  {
                package_id: "605a1e7d843de62e8c60b2cb",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            };
            const resp = await request(server).post('/api/delivery').send(deliveryObj);
            expect(resp.status).toBe(HttpStatus.CREATED);
            expect(resp.body).toHaveProperty('status', "picked-up");
        });
    });


    describe('PUT /:id', () => {
        it('should return status code 404 if delivery does not exist', async () => {
            const deliveryObj = {
                package_id: "605a1e7d843de62e8c60b2cb",
                pickup_time: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                location: {
                    lat: 210,
                    lng: 410
                },
                status: "picked-up"
            };

            const resp = await request(server).put('/api/delivery/605a1e7d843de62e8c60b2cb').send(deliveryObj);

            expect(resp.status).toBe(HttpStatus.NOT_FOUND);

        });

        it('should update the delivery if the id is valid', async () => {
            let newDelivery = {
                package_id: "615af9a616d3bb001e0d5e2f",
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

            const resp = await request(server).put(`/api/delivery/${deliveryObj.delivery_id}`).send({
                ...newDelivery,
                status: 'open'
            });

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
                package_id: "9e304a25b1b43d48b2e2f6ce",
            });

            const resp = await request(server).put('/api/delivery/' + deliveryObj.delivery_id).send(deliveryObj);
            expect(resp.status).toBe(HttpStatus.BAD_REQUEST);

        });

    });
});