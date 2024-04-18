const {describe, expect, it, beforeAll} = require("@jest/globals");
const {deliveryService, validate} = require('../../../../domain/service/delivery.service');
const deliveryRepository = require('../../../../domain/repository/delivery.repository');

const locationService = require("pk-common-lib/service/location.service");

jest.mock('../../../../domain/repository/delivery.repository');
jest.mock('pk-common-lib/service/location.service');


let deliveries;

describe('delivery service', () => {

    beforeAll(() => {
        deliveries = [
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
    });

    it('should get all deliveries', async () => {
        deliveryRepository.find.mockImplementation(() => deliveries);
        const dbDeliverys = await deliveryService.getDeliveries();

        expect(dbDeliverys).toEqual(expect.arrayContaining(deliveries));

    });

    it('should create a delivery', async () => {
        const newDelivery = {
            package_id: "88d2498facc1691b26106222",
            pickup_time: new Date(),
            start_time: new Date(),
            end_time: new Date(),
            location: {
                lat: 210,
                lng: 410
            },
            status: "picked-up"
        };

        const location ={lat: 10, lng: 10};
        deliveryRepository.create.mockImplementation(() => ({...deliveries[1],location:location}));
        locationService.createLocation.mockImplementationOnce(() =>(location));
        locationService.getLocationByLatLng.mockImplementationOnce(() =>(location));
        const dbDelivery = await deliveryService.createDelivery(newDelivery);

        expect(deliveryRepository.create).toHaveBeenCalledWith({...newDelivery,location:location});
        expect(dbDelivery).toMatchObject({...deliveries[1],location:location});
    });


    it('should get a delivery by ID', async () => {
        deliveryRepository.findOne.mockImplementation(() => deliveries[0]);
        const dbDelivery = await deliveryService.getDeliveryById("9e304a25b1b43d48b2e2f6ce");
        expect(deliveryRepository.findOne).toHaveBeenCalledWith({delivery_id: "9e304a25b1b43d48b2e2f6ce"});
        expect(dbDelivery).toMatchObject(deliveries[0]);

    });

    it('should delete a delivery by ID', async () => {
        deliveryRepository.findOneAndDelete.mockImplementationOnce(() => deliveries[0]);
        await deliveryService.deleteDeliveryById("9e304a25b1b43d48b2e2f6ce");
        expect(deliveryRepository.findOneAndDelete).toHaveBeenCalledWith({delivery_id: "9e304a25b1b43d48b2e2f6ce"});
    });


    it('should update a delivery by ID', async () => {
        const newDelivery = {
            package_id: "49ed9bcab17c9ac5614d",
            pickup_time: new Date(),
            start_time: new Date(),
            end_time: new Date(),
            location: {
                lat: 210,
                lng: 410
            },
            status: "picked-up"
        };
        deliveryRepository.findOneAndUpdate.mockImplementationOnce(() => deliveries[1]);
        locationService.createLocation.mockImplementationOnce(() =>({lat: 10, lng: 10}));
        locationService.getLocationByLatLng.mockImplementationOnce(() =>({lat: 10, lng: 10}));
        const dbDelivery = await deliveryService.updateDeliveryById("9e304a25b1b43d48b2e2f6ce", newDelivery);
        expect(deliveryRepository.findOneAndUpdate.mock.calls[0][0]).toEqual({delivery_id: "9e304a25b1b43d48b2e2f6ce"});
        expect(dbDelivery).toMatchObject(deliveries[1]);
    });

});

describe('validateDelivery', () => {
    it('should throw an error if the inputs are invalid', () => {
        const newDelivery = {};
        const {value, error} = validate.create(newDelivery);
        expect(error).not.toBeNull();
    });


    it('should validate the delivery with success and populate the database', () => {
        const newDelivery = {
            package_id: "0892f3f0-d4b9-4e2c-9331-54fc531c9cd5",
            pickup_time: new Date(),
            start_time: new Date(),
            end_time: new Date(),
            location: {
                lat: 210,
                lng: 410
            },
            status: "picked-up"
        };

        const {value, error} = validate.create(newDelivery);
        expect(error).toBeUndefined();
        expect(value).toMatchObject(newDelivery);
    });

})

