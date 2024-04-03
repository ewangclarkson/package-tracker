const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const deliveryRepository = require('../repository/delivery.repository');


const DeliveryService = {

    async getDeliveries() {
        return deliveryRepository.find();
    },

    async createDelivery(deliveryRequest) {
        return deliveryRepository.create(deliveryRequest);
    },

    async getDeliveryById(id) {
        return deliveryRepository.findOne({delivery_id: id});
    },

    async deleteDeliveryById(id) {
        return deliveryRepository.findOneAndDelete({delivery_id: id});
    },
    async updateDeliveryById(id, deliveryRequest) {
        return deliveryRepository.findOneAndUpdate({delivery_id: id}, {
                $set: deliveryRequest
            },
            {new: true}
        );
    },

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
            package_id: Joi.objectId(),
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

module.exports = {DeliveryService, validate};
