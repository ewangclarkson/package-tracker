const deliveryService = require('../domain/service/delivery.service');
const HttpStatus = require('pk-common-lib/http/http.status');

const DeliveryController = {

    async getDeliveries(req, res) {
        const deliverys = await deliveryService.getDeliverys();
        return res.status(HttpStatus.SUCCESS).send(deliverys);
    },

    async getDelivery(req, res) {
        const deliveryObj = await deliveryService.getDeliveryById(req.params.id);
        if (!deliveryObj) {
            return res.status(HttpStatus.NOT_FOUND).send("Could not find the delivery with the given id")
        }

        return res.status(HttpStatus.SUCCESS).send(deliveryObj);
    },
    async creatDelivery(req, res) {
        const {value, error} = deliveryService.validate(req.body);
        if (error) {return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)};

        const deliveryObj = await deliveryService.createDelivery(req.body);
        return res.status(HttpStatus.CREATED).send(deliveryObj);
    },
    async deleteDelivery(req, res) {
        const deliveryObj = await deliveryService.deleteDeliveryById(req.params.id);
        if (!deliveryObj) {
            return res.status(HttpStatus.NOT_FOUND).send("Could not find the delivery with the given id")
        }

        return res.send("Delivery with given id was deleted successfully")
    },

    async updateDelivery(req, res) {
        const {value, error} = deliveryService.validate(req.body);
        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)
        }
        const deliveryObj = await deliveryService.updateDeliveryById(req.params.id, req.body);

        return res.status(HttpStatus.SUCCESS).send(deliveryObj);
    }

};

module.exports = DeliveryController;