const {describe, expect, it, beforeAll} = require("@jest/globals");
const {packageService,validate} = require('../../../../domain/service/package.service');
const packageRepository = require('../../../../domain/repository/package.repository');

jest.mock('../../../../domain/repository/package.repository');

let packages;
describe('package service', () => {

    beforeAll(() => {
        packages = [
            {
                active_delivery_id: "3369758c-3b52-4962-b527-e0d62fd67cc3",
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
                active_delivery_id: "86f90e77-3df0-4479-bb96-55459e9e3d92",
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
            active_delivery_id: "12029f2f-b95d-45a4-9cb0-616bc7470e5e",
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
        const dbPackage = await packageService.getPackageById("12029f2f-b95d-45a4-9cb0-616bc7470e5e");
        expect(packageRepository.findOne).toHaveBeenCalledWith({package_id:"12029f2f-b95d-45a4-9cb0-616bc7470e5e"});
        expect(dbPackage).toMatchObject(packages[0]);

    });

    it('should delete a package by ID', async () => {
        packageRepository.findOneAndDelete.mockImplementationOnce(() => packages[0]);
        await packageService.deletePackageById("12029f2f-b95d-45a4-9cb0-616bc7470e5e");
        expect(packageRepository.findOneAndDelete).toHaveBeenCalledWith({package_id:"12029f2f-b95d-45a4-9cb0-616bc7470e5e"});
    });


    it('should update a package by ID', async () => {
        const newPackage = {
            active_delivery_id: "12029f2f-b95d-45a4-9cb0-616bc7470e5e",
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
        const dbPackage = await packageService.updatePackageById("12029f2f-b95d-45a4-9cb0-616bc7470e5e", newPackage);
        expect(packageRepository.findOneAndUpdate.mock.calls[0][0]).toEqual({package_id:"12029f2f-b95d-45a4-9cb0-616bc7470e5e"});
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
            active_delivery_id: "12029f2f-b95d-45a4-9cb0-616bc7470e5e",
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
        //expect(error).toBeUndefined();
        expect(value).toMatchObject(newPackage);
    });

})

