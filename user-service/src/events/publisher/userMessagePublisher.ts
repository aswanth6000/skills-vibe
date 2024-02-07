import RabbitMQ from '../messages/rabbitMQ'

const userMessagePublisher = {

    async userMessageEvent(updatedUserData: any): Promise<void> {
        try {
            console.log("Starting User MessageRabbitMQ producer...");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'user-message-exchange';
            const routingKey = 'user-message-created';
            await channel.assertExchange(exchangeName, 'direct', { durable: false });
            channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(updatedUserData)));
            await channel.close();
        } catch (error) {
            console.error('Error publishing user messagee event:', error);
        }
},
    async userUpdateMessageEvent(updatedUserData: any): Promise<void> {
        try {
            console.log("Starting User update MessageRabbitMQ producer...");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'user-update-message-exchange';
            const routingKey = 'user-update-message-created';
            await channel.assertExchange(exchangeName, 'direct', { durable: false });
            channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(updatedUserData)));
            await channel.close();
        } catch (error) {
            console.error('Error publishing user update messagee event:', error);
        }
},
}

export default userMessagePublisher