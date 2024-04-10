const {deliveryService} = require('../domain/service/delivery.service');

module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('location_changed',  async ({delivery_id, location}) => {
            const newDelivery = await deliveryService.updateDeliveryById(delivery_id, {location: location});
            socket.broadcast.emit("delivery_updated", newDelivery);
        });

        socket.on('status_changed',  async ({delivery_id,status}) => {
           const newDelivery = await deliveryService.updateDeliveryStatus(delivery_id, status);

            socket.broadcast.emit("delivery_updated", newDelivery);
        });
    });

};