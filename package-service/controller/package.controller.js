const {packageService,validate} = require('../domain/service/package.service');
const locationService = require('pk-common-lib/service/location.service');
const HttpStatus = require('pk-common-lib/http/http.status');

const PackageController = {

    async getPackages(req, res) {
        const packages = await packageService.getPackages();
        return res.status(HttpStatus.SUCCESS).send(packages);
    },

    async getPackage(req, res) {
        const packageObj = await packageService.getPackageById(req.params.id);
        if (!packageObj) {
            return res.status(HttpStatus.NOT_FOUND).send("Could not find the package with the given id")
        }

        return res.status(HttpStatus.SUCCESS).send(packageObj);
    },
    async creatPackage(req, res) {
        const {value, error} = validate.create(req.body);
        if (error) {return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)};

        let toLocation = await locationService.getLocationByLatLng(req.body.to_location.lat,req.body.to_location.lng);
        if(!toLocation) toLocation =await locationService.createLocation({lat:req.body.to_location.lat,lng:req.body.to_location.lng});

        let fromLocation = await locationService.getLocationByLatLng(req.body.from_location.lat, req.body.from_location.lng);
        if (!fromLocation) fromLocation = await locationService.createLocation({lat: req.body.from_location.lat, lng: req.body.from_location.lng
        });

        const packageObj = await packageService.createPackage({...req.body,from_location:fromLocation,to_location:toLocation});

        return res.status(HttpStatus.CREATED).send(packageObj);
    },
    async deletePackage(req, res) {
        const packageObj = await packageService.deletePackageById(req.params.id);
        if (!packageObj) {
            return res.status(HttpStatus.NOT_FOUND).send("Could not find the package with the given id")
        }

        return res.send(packageObj);
    },

    async updatePackage(req, res) {
        const {value, error} = validate.update(req.body);
        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)
        }

        const exist = await packageService.getPackageById(req.params.id);
        if (!exist) {
            return res.status(HttpStatus.NOT_FOUND).send("Could not find the package with the given id")
        }

        let toLocation = await locationService.getLocationByLatLng(req.body.to_location.lat,req.body.to_location.lng);
        if(!toLocation) toLocation =await locationService.createLocation({lat:req.body.to_location.lat,lng:req.body.to_location.lng});

        let fromLocation = await locationService.getLocationByLatLng(req.body.from_location.lat, req.body.from_location.lng);
        if (!fromLocation) fromLocation = await locationService.createLocation({lat: req.body.from_location.lat, lng: req.body.from_location.lng});

        const packageObj = await packageService.updatePackageById(req.params.id, {...req.body,from_location:fromLocation,to_location:toLocation});

        return res.status(HttpStatus.SUCCESS).send(packageObj);
    }

};

module.exports = PackageController;