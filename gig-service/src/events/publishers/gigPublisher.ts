// gigPublisher.ts
import RabbitMQ from '../../../../messages/rabbitMQ';

const gigPublisher = {
  async gigCreatedEvent(gigCreatedData: any): Promise<void> {
    try {
      console.log('Starting RabbitMQ server');
      
      console.log('Creating RabbitMQ channel');

      const channel = await RabbitMQ.createChannel();
      const exchangeName = 'gig-exchange';
      const routingKey = 'gig-created';

      console.log('Asserting RabbitMQ exchange');

      await channel.assertExchange(exchangeName, 'direct', { durable: false });
      channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(gigCreatedData)));

      console.log('Closing RabbitMQ channel');

      await channel.close();
    } catch (err) {
      console.error('Error publishing gig created event:', err);
    }
  },
};

export default gigPublisher;
