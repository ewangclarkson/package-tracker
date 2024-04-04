const {describe, expect, it, beforeAll} = require("@jest/globals");
const locationService = require('../../../service/location.service');
const {locationSchema,locationRepository} = require('../../../repository/location.repository');

let locations;
describe('location service', () => {

    beforeAll(() => {
        locations = [
            {lat: 10, lng: 30},
            {lat: 40, lng: 50}
        ]
    });

    it('should get all locations by latitude and longitude', async () => {
        locationRepository.findOne = jest.fn().mockImplementation(() => locations);
        const dbLocations = await locationService.getLocationByLatLng(2, 3);
        expect(dbLocations).toEqual(expect.arrayContaining(locations));

    });

    it('should create a location', async () => {
        const newLocation = {lat: 10, lng: 30};

        locationRepository.create = jest.fn().mockImplementation(() => locations[1]);
        const dbLocation = await locationService.createLocation(newLocation);

        expect(locationRepository.create).toHaveBeenCalledWith(newLocation);
        expect(dbLocation).toMatchObject(locations[1]);
    });

});