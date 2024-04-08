const {deliveryService, validate} = require('../domain/service/delivery.service');
const HttpStatus = require('pk-common-lib/http/http.status');
const {RPCRequest} = require("../brokers/rpc");

const RPC_QUEUE_NAME = "PACKAGE_SERVICE_QUEUE";

const DeliveryController = {

    async getDeliveries(req, res) {
        const deliveries = await deliveryService.getDeliveries();
        return res.status(HttpStatus.SUCCESS).send(deliveries);
    },

    async getDelivery(req, res) {
        const deliveryObj = await deliveryService.getDeliveryById(req.params.id);
        if (!deliveryObj) {
            return res.status(HttpStatus.NOT_FOUND).send("Could not find the delivery with the given id")
        }

        return res.status(HttpStatus.SUCCESS).send(deliveryObj);
    },
    async creatDelivery(req, res) {
        const {value, error} = validate.create(req.body);

        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)
        }

        const deliveryObj = await deliveryService.createDelivery(req.body);

        const response = await RPCRequest(RPC_QUEUE_NAME, {
            package_id: deliveryObj.package_id,
            delivery_id: deliveryObj.delivery_id
        });
console.log(response);
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
        const {value, error} = validate.update(req.body);
        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)
        }

        const exist = await deliveryService.deleteDeliveryById(req.params.id);
        if (!exist) {
            return res.status(HttpStatus.NOT_FOUND).send("Could not find the delivery with the given id")
        }

        const deliveryObj = await deliveryService.updateDeliveryById(req.params.id, req.body);

        return res.status(HttpStatus.SUCCESS).send(deliveryObj);
    }

};

module.exports = DeliveryController;