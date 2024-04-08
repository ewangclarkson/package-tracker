const amqplib = require('amqplib');
const config = require("config");
import {v4 as uuidv4} from 'uuid';

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


const RPCObserver = async (RPC_QUEUE_NAME, fakeResponse) => {
    const channel = await getChannel();
    await channel.assertQueue(RPC_QUEUE_NAME, {
        durable: false
    });

    channel.prefetch(1);
    channel.consume(RPC_QUEUE_NAME, (msg) => {
            if (msg.content) {
                const payload = JSON.parse(msg.content.toString());
                const response = {fakeResponse, payload};
                channel.sendToQueue(msg.properties.replayTo, Buffer.from(JSON.stringify(response)), {
                    correlationId: msg.properties.correlationId
                });
            }
        },
        {noAck: false}
    );
};


const requestData = async (RPC_QUEUE_NAME, payload, uuid) => {

    const channel = getChannel();
    const q = await channel.assertQueue("", {exclusive: true});

    channel.sendToQueue(RPC_QUEUE_NAME, Buffer.from(JSON.stringify(payload)),
        {
            replayTo:q.name,
            correlationId: uuid
        });

    return new Promise((resolve, reject) => {
        channel.consume(q.queue,(msg) =>{
            if(msg.properties.correlationId === uuid){
                resolve(JSON.parse(msg.content.toString()));
            }else{
                reject("data not found")
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
    RPCObserver,
    RPCRequest
}

