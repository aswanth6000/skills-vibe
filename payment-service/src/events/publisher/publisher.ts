import RabbitMQ from '../../../../common/src/messages/rabbitMQ';
const paymentPublisher = {
    async orderEvent(orderDetails: any): Promise<void>{
        try {
            console.log("Starting RabbitMQ producer...");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'payment-exchange';
            const routingKey = 'payment-done';
            await channel.assertExchange(exchangeName, 'direct', { durable: false });
            channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(orderDetails)));
            await channel.close();
            console.log('channel closed payment');
        } catch (error) {
            console.log('error publishing order details event ');
            
        }
    }
}

export default paymentPublisher