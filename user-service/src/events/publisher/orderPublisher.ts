import { connectQueue, channel, connection } from '../messages/rabbitMQ';

const orderPublisher = async (data: any) => {
    channel.sendToQueue("ORDER", Buffer.from(JSON.stringify(data)));
    await channel.close();
    await connection.close();
};
export { orderPublisher, connectQueue };

