const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const packageRepository = require('../repository/package.repository');


const PackageService = {

    async getPackages() {
        return packageRepository.find();
    },

    async createPackage(packageRequest) {
        return packageRepository.create(packageRequest);
    },

    async getPackageById(id) {
        return packageRepository.findOne({package_id: id});
    },

    async deletePackageById(id) {
        return packageRepository.findOneAndDelete({package_id: id});
    },
    async updatePackageById(id, packageRequest) {
        return packageRepository.findOneAndUpdate({package_id: id}, {
                $set: packageRequest
            },
            {new: true}
        );
    },

    validate(packageRequest) {
        const schema = Joi.object({
            active_delivery_id: Joi.objectId(),
            description: Joi.string().required(),
            weight: Joi.number().required(),
            width: Joi.number().required(),
            height: Joi.number().required(),
            depth: Joi.number().required(),
            from_name: Joi.string().required(),
            from_address: Joi.string().required(),
            from_location: Joi.object({
                lat: Joi.number().required(),
                lng: Joi.number().required()
            }),
            to_name: Joi.string().required(),
            to_address: Joi.string().required(),
            to_location: Joi.object({
                lat: Joi.number().required(),
                lng: Joi.number().required()
            })

        });

        return schema.validate(packageRequest);
    }

};

module.exports = PackageService;
