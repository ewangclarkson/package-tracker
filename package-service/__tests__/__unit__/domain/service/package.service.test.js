const {describe, expect, it, beforeAll} = require("@jest/globals");
const {packageService,validate} = require('../../../../domain/service/package.service');
const packageRepository = require('../../../../domain/repository/package.repository');

jest.mock('../../../../domain/repository/package.repository');

let packages;
describe('package service', () => {

    beforeAll(() => {
        packages = [
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
    });

    it('should get all packages', async () => {
        packageRepository.find.mockImplementation(() => packages);
        const dbPackages = await packageService.getPackages();

        expect(dbPackages).toEqual(expect.arrayContaining(packages));

    });

    it('should create a package', async () => {
        const newPackage = {
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

        packageRepository.create.mockImplementation(() => packages[1]);
        const dbPackage = await packageService.createPackage(newPackage);

        expect(packageRepository.create).toHaveBeenCalledWith(newPackage);
        expect(dbPackage).toMatchObject(packages[1]);
    });


    it('should get a package by ID', async () => {
        packageRepository.findOne.mockImplementation(() => packages[0]);
        const dbPackage = await packageService.getPackageById("9e304a25b1b43d48b2e2f6ce");
        expect(packageRepository.findOne).toHaveBeenCalledWith({package_id:"9e304a25b1b43d48b2e2f6ce"});
        expect(dbPackage).toMatchObject(packages[0]);

    });

    it('should delete a package by ID', async () => {
        packageRepository.findOneAndDelete.mockImplementationOnce(() => packages[0]);
        await packageService.deletePackageById("9e304a25b1b43d48b2e2f6ce");
        expect(packageRepository.findOneAndDelete).toHaveBeenCalledWith({package_id:"9e304a25b1b43d48b2e2f6ce"});
    });


    it('should update a package by ID', async () => {
        const newPackage = {
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
        packageRepository.findOneAndUpdate.mockImplementationOnce(() => packages[1]);
        const dbPackage = await packageService.updatePackageById("9e304a25b1b43d48b2e2f6ce", newPackage);
        expect(packageRepository.findOneAndUpdate.mock.calls[0][0]).toEqual({package_id:"9e304a25b1b43d48b2e2f6ce"});
        expect(dbPackage).toMatchObject(packages[1]);
    });

});

describe('validatePackage', () => {
    it('should throw an error if the inputs are invalid', () => {
        const newPackage = {};
        const {value, error} = validate.create(newPackage);
        expect(error).not.toBeNull();
    });


    it('should validate the package with success and populate the database', () => {
        const newPackage = {
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

        const {value, error} = validate.create(newPackage);
        expect(error).toBeUndefined();
        expect(value).toMatchObject(newPackage);
    });

})

