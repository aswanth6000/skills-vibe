import RabbitMQ from '../../../../common/src/messages/rabbitMQ'




const userPublisher = {

    async userUpdatedEvent(updatedUserData: any): Promise<void> {
        try {
            console.log("Starting RabbitMQ producer...");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'user-exchange';
            const routingKey = 'user-created';
            await channel.assertExchange(exchangeName, 'direct', { durable: false });
            channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(updatedUserData)));
            await channel.close();
        } catch (error) {
            console.error('Error publishing user update  event:', error);
        }
}
}

export default userPublisher