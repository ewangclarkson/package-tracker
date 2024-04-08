const amqplib = require('amqplib');
const config = require("config");
const { v4: uuidv4 } = require('uuid');

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


const requestData = async (RPC_QUEUE_NAME, payload, uuid) => {

    const channel = await getChannel();
    const q = await channel.assertQueue("", {exclusive: true});

    channel.sendToQueue(RPC_QUEUE_NAME, Buffer.from(JSON.stringify(payload)),
        {
            replyTo:q.queue,
            correlationId: uuid
        });
    return new Promise((resolve, reject) => {
        channel.consume(q.queue,(msg) =>{
            if(msg.properties.correlationId === uuid){
                resolve(JSON.parse(msg.content.toString()));
            }else{
            }
        },{noAck: true})
    });
}

const RPCRequest = async (RPC_QUEUE_NAME, payload) => {
    const uuid = uuidv4();
    return  requestData(RPC_QUEUE_NAME, payload, uuid);
};

module.exports={
    getChannel,
    RPCRequest
}

