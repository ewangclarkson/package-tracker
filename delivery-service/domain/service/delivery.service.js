const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const locationService = require('pk-common-lib/service/location.service');
const deliveryRepository = require('../repository/delivery.repository');


const deliveryService = {

    async getDeliveries() {
        return deliveryRepository.find();
    },

    async createDelivery(deliveryRequest) {
        let location = await locationService.getLocationByLatLng(deliveryRequest.location.lat, deliveryRequest.location.lng);
        if (!location) location = await locationService.createLocation({
            lat: deliveryRequest.location.lat,
            lng: deliveryRequest.location.lng
        });

        return deliveryRepository.create({...deliveryRequest, location: location});
    },

    async getDeliveryById(id) {
        return deliveryRepository.findOne({delivery_id: id});
    },

    async deleteDeliveryById(id) {
        return deliveryRepository.findOneAndDelete({delivery_id: id});
    },
    async updateDeliveryById(id, deliveryRequest) {

        let location = await locationService.getLocationByLatLng(deliveryRequest.location.lat, deliveryRequest.location.lng);
        if (!location) location = await locationService.createLocation({
            lat: deliveryRequest.location.lat,
            lng: deliveryRequest.location.lng
        });

        return deliveryRepository.findOneAndUpdate({delivery_id: id}, {
                $set: {
                    ...deliveryRequest,
                    location: location
                }
            },
            {new: true}
        );
    },

    async updateDeliveryStatus(deliveryId, status) {
        const delivery = await this.getDeliveryById(deliveryId);
        if (((delivery.status === 'open') && (status === 'picked-up')))
            delivery.pickup_time = new Date();

        if (((delivery.status === 'picked-up') && (status === 'in-transit')))
            delivery.start_time = new Date();

        if (((delivery.status === 'in-transit') && (status === 'delivered')) || ((delivery.status === 'in-transit') && (status === 'failed')))
            delivery.end_time = new Date();

        delivery.status = status;

        return delivery.save();
    }

};
const validate = {
    update: function (deliveryRequest) {
        const schema = Joi.object({
            package_id: Joi.objectId(),
            pickup_time: Joi.date(),
            start_time: Joi.date(),
            end_time: Joi.date(),
            location: Joi.object({
                lat: Joi.number(),
                lng: Joi.number()
            }),
            status: Joi.string().valid('open', 'picked-up', 'in-transit', 'delivered', 'failed')

        });

        return schema.validate(deliveryRequest);
    },
    create: function (deliveryRequest) {
        const schema = Joi.object({
            package_id: Joi.objectId().required(),
            pickup_time: Joi.date().required(),
            start_time: Joi.date().required(),
            end_time: Joi.date().required(),
            location: Joi.object({
                lat: Joi.number().required(),
                lng: Joi.number().required()
            }).required(),
            status: Joi.string().valid('open', 'picked-up', 'in-transit', 'delivered', 'failed')

        });

        return schema.validate(deliveryRequest);
    }
}

module.exports = {deliveryService, validate};
