const amqplib = require('amqplib');
const config = require("config");
const {packageService} = require("../domain/service/package.service");

let amqpLibConnection = null;

const amqpUlr = config.get("rabbitMq.prefix") +
    config.get("rabbitMq.password") +
    config.get("rabbitMq.host");

const getChannel = async () => {
    if (amqpLibConnection == null) {
        amqpLibConnection = await amqplib.connect(amqpUlr);
    }
    return amqpLibConnection.createChannel();
};


const RPCObserver = async (RPC_QUEUE_NAME) => {
    const channel = await getChannel();
    await channel.assertQueue(RPC_QUEUE_NAME, {
        durable: false
    });

    channel.prefetch(1);
    channel.consume(RPC_QUEUE_NAME, async (msg) => {
            if (msg.content) {
                const payload = JSON.parse(msg.content.toString());
                const response = await packageService.updatePackageById(payload.package_id, {active_delivery_id: payload.delivery_id});

                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
                    correlationId: msg.properties.correlationId
                });
                channel.ack(msg);
            }
        });
};

module.exports = {
    getChannel,
    RPCObserver
}

