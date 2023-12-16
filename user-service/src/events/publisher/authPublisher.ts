import RabbitMQ from '../../../../messages/rabbitMQ'

interface UserLoggedInEvent {
    userId: string;
    timestamp: Date;
  }


const publisher = {
    async publishUserLoggedInEvent(userId: any): Promise<void> {
        try {
            console.log("Starting RabbitMQ producer...");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'user-exchange';
            const routingKey = 'user-logged-in';
            await channel.assertExchange(exchangeName, 'direct', { durable: false });
            const userLoggedInEvent: UserLoggedInEvent = {
                userId,
                timestamp: new Date(),
            };
            channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(userLoggedInEvent)));
            console.log('User logged in event published to RabbitMQ exchange');
            await channel.close();
        } catch (error) {
            console.error('Error publishing user logged in event:', error);
        }
}
}

export default publisher