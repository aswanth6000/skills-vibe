import RabbitMQ from '../../../../common/src/messages/rabbitMQ';
const orderPublisher = {
    async orderEvent(orderDetails: any): Promise<void>{
        try {
            console.log("Starting RabbitMQ producer...");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'order-exchange';
            const routingKey = 'order-created';
            await channel.assertExchange(exchangeName, 'direct', { durable: false });
            channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(orderDetails)));
            await channel.close();
            console.log('channel closed order');
            
        } catch (error) {
            console.log('error publishing order details event ');
            
        }
    }
}

export default orderPublisher