const {describe, beforeEach, afterEach, it, expect, afterAll} = require('@jest/globals');
const request = require('supertest');
const {connect, disconnect} = require('../../../startup/database');
const packageRepository = require('../../../domain/repository/package.repository');
const HttpStatus = require('pk-common-lib/http/http.status');
const {generateToken} = require('pk-common-lib/middleware/auth');


let server;
let token;
describe("/api/package", () => {

    beforeEach(async () => {
        server = require('../../../app');
        let packages = [
            {
                active_delivery_id: "6c2b4a62bc2d2f67d7a9b9e1",
                description: "Bag of laptops",
                weight: 200,
                width: 300,
                height: 300,
                depth: 0,
                from_name: "Fon Harriet",
                from_address: "Molyko,Buea- Cameroon",
                from_location: {
                    lat: 10,
                    lng: 40
                },
                to_name: "Fon Vallery",
                to_address: "Bonabri, Douala- Cameroon",
                to_location: {
                    lat: 45,
                    lng: 70
                }
            },
            {
                active_delivery_id: "6a434b489e5d6b6b4b9f5d4f",
                description: "Smart TV 4HD 45 inch",
                weight: 400,
                width: 500,
                height: 500,
                depth: 0,
                from_name: "Ewang Clarkson",
                from_address: "Molyko,Buea- Cameroon",
                from_location: {
                    lat: 109,
                    lng: 89
                },
                to_name: "Ahondo",
                to_address: "lome- Togo",
                to_location: {
                    lat: 90,
                    lng: 75
                }
            }
        ];
        token = await generateToken({
            _id: "615af9a616d3bb001e0d5e2f",
            name: "Nasa Vallery",
            email: "ewangclarks@gmail.com",
            phoneNumber: 673676301,
            roles: ['USER', 'DRIVER', 'ADMIN'],
        });
        await packageRepository.insertMany(packages);
    });

    afterEach(async () => {
        await packageRepository.deleteMany({});
        server.close()
    });

    afterAll(() => disconnect());

    describe('GET /', () => {
        it('should return a list of packages', async () => {
            const resp = await request(server).get('/api/package').set("Authorization", "Bearer " + token);;
            expect(resp.status).toBe(HttpStatus.SUCCESS);
            expect(resp.body.length).toEqual(2);
            expect(resp.body.some((p) => p.description === 'Bag of laptops')).toBeTruthy();
        });

    });
   describe('GET /:id', () => {
        it('should return a 404 status code if the package does not exist', async () => {
            const resp = await request(server).get('/api/package/6609af6e87555f3d88a34147').set("Authorization", "Bearer " + token);;
            expect(resp.status).toBe(HttpStatus.NOT_FOUND);
        });

        it('should return the package with a status code of 200', async () => {
            const packageObj = await packageRepository.create({
                active_delivery_id: "9e304a25b1b43d48b2e2f6ce",
                description: "Bag of laptops",
                weight: 200,
                width: 300,
                height: 300,
                depth: 0,
                from_name: "Kenny Eyon",
                from_address: "Molyko,Buea- Cameroon",
                from_location: {
                    lat: 11,
                    lng: 41
                },
                to_name: "Nasah Kuma",
                to_address: "Bonabri, Douala- Cameroon",
                to_location: {
                    lat: 46,
                    lng: 71
                }
            });

            const resp = await request(server).get(`/api/package/${packageObj.package_id}`).set("Authorization", "Bearer " + token);;
            expect(resp.status).toBe(HttpStatus.SUCCESS);
            expect(resp.body.description).toEqual(packageObj.description);
        });
    });

    describe('DELETE /:id', () => {

        it('should return 404 if the given id does not exist', async () => {
            const resp = await request(server).delete(`/api/package/6609af6e87555f3d88a34147`).set("Authorization", "Bearer " + token);;
            expect(resp.status).toEqual(HttpStatus.NOT_FOUND);
        });

        it('should delete the package and return 200 status code', async () => {
            const packageObj = await packageRepository.create({
                active_delivery_id: "9e304a25b1b43d48b2e2f6ce",
                description: "Bag of laptops",
                weight: 200,
                width: 300,
                height: 300,
                depth: 0,
                from_name: "Kenny Eyon",
                from_address: "Molyko,Buea- Cameroon",
                from_location: {
                    lat: 11,
                    lng: 41
                },
                to_name: "Nasah Kuma",
                to_address: "Bonabri, Douala- Cameroon",
                to_location: {
                    lat: 46,
                    lng: 71
                }
            });
            const resp = await request(server).delete(`/api/package/${packageObj.package_id}`).set("Authorization", "Bearer " + token);;
            expect(resp.status).toEqual(HttpStatus.SUCCESS);
        });
    });

    describe('POST /', () => {
        it('should return status code 400 if validation fails', async () => {
            const packageObj = {
                weight: 200,
                width: 300,
                height: 300,
                depth: 0,
                from_name: "Kenny Eyon",
                from_address: "Molyko,Buea- Cameroon",
                from_location: {
                    lat: 11,
                    lng: 41
                },
                to_name: "Nasah Kuma",
                to_address: "Bonabri, Douala- Cameroon",
                to_location: {
                    lat: 46,
                    lng: 71
                }
            };

            const resp = await request(server).post('/api/package').send(packageObj).set("Authorization", "Bearer " + token);;
            expect(resp.status).toBe(HttpStatus.BAD_REQUEST);

        });

        it('should return status code 201 and create package', async () => {
            const packageObj = {
                description: "Bag of laptops",
                weight: 200,
                width: 300,
                height: 300,
                depth: 0,
                from_name: "Kenny Eyon",
                from_address: "Molyko,Buea- Cameroon",
                from_location: {
                    lat: 11,
                    lng: 41
                },
                to_name: "Nasah Kuma",
                to_address: "Bonabri, Douala- Cameroon",
                to_location: {
                    lat: 46,
                    lng: 71
                }
            };
            const resp = await request(server).post('/api/package').send(packageObj).set("Authorization", "Bearer " + token);;
            expect(resp.status).toBe(HttpStatus.CREATED);
            expect(resp.body).toHaveProperty('weight', 200);
        });
    });


    describe('PUT /:id', () => {
        it('should return status code 404 if package does not exist', async () => {
            const packageObj = {
                active_delivery_id: "9e304a25b1b43d48b2e2f6ce",
                description: "Bag of laptops",
                weight: 200,
                width: 300,
                height: 300,
                depth: 0,
                from_name: "Kenny Eyon",
                from_address: "Molyko,Buea- Cameroon",
                from_location: {
                    lat: 11,
                    lng: 41
                },
                to_name: "Nasah Kuma",
                to_address: "Bonabri, Douala- Cameroon",
                to_location: {
                    lat: 46,
                    lng: 71
                }
            };

            const resp = await request(server).put('/api/package/605a1e7d843de62e8c60b2cb').send(packageObj).set("Authorization", "Bearer " + token);;

            expect(resp.status).toBe(HttpStatus.NOT_FOUND);

        });

        it('should update the package if the id is valid', async () => {
            let newPackage = {
                active_delivery_id: "9e304a25b1b43d48b2e2f6ce",
                description: "Bag of laptops",
                weight: 200,
                width: 300,
                height: 300,
                depth: 0,
                from_name: "Kenny Eyon",
                from_address: "Molyko,Buea- Cameroon",
                from_location: {
                    lat: 11,
                    lng: 41
                },
                to_name: "Nasah Kuma",
                to_address: "Bonabri, Douala- Cameroon",
                to_location: {
                    lat: 46,
                    lng: 71
                }
            };

            const packageObj = await packageRepository.create(newPackage);

            const resp = await request(server).put(`/api/package/${packageObj.package_id}`).send({...newPackage, from_name: 'Lobe serge'}).set("Authorization", "Bearer " + token);;

            expect(resp.status).toBe(HttpStatus.SUCCESS);
        });
        it('should return status code 400 if validation fails', async () => {
            const newPackage = {
                active_delivery_id: "9e304a25b1b43d48b2e2f6ce",
                weight: 200,
                width: 300,
                height: 300,
                depth: 0,
                from_name: "Kenny Eyon",
                from_address: "Molyko,Buea- Cameroon",
                from_location: {
                    lat: 11,
                    lng: 41
                },
                to_name: "Nasah Kuma",
                to_address: "Bonabri, Douala- Cameroon",
                to_location: {
                    lat: 46,
                    lng: 71
                }
            };
            const packageObj = await packageRepository.create({...newPackage, to_name: 'Suh Edmond',  description: "Bag of laptops",});

            const resp = await request(server).put('/api/package/' + packageObj.package_id).send(packageObj).set("Authorization", "Bearer " + token);;
            expect(resp.status).toBe(HttpStatus.BAD_REQUEST);

        });

    });
});