import {  channel, connection } from '../messages/rabbitMQ';

const orderPublisher = async (data: any) => {
    try {
        channel.sendToQueue("ORDER", Buffer.from(JSON.stringify(data)));
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error(error);
    }
};
export { orderPublisher };

