import * as amqp from 'amqplib';

const rabbitURL: any = process.env.RABBIT_MQ;

let channel: amqp.Channel, connection: amqp.Connection;

const connectQueue = async () => {
    try {
        connection = await amqp.connect(rabbitURL);
        channel = await connection.createChannel();
        await channel.assertQueue("ORDER");
    } catch (error) {
        console.log(error);
    }
};

export { connectQueue, channel, connection };