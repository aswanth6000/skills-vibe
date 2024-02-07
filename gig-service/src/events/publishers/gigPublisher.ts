import RabbitMQ from '../messages/rabbitMQ';

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
  // async gigStatusEvent(gigStatusData: any): Promise<void> {
  //   try {
  //     console.log('Starting RabbitMQ server');
      
  //     console.log('Creating RabbitMQ channel');

  //     const channel = await RabbitMQ.createChannel();
  //     const exchangeName = 'gig-exchange';
  //     const routingKey = 'gig-status-created';

  //     console.log('Asserting RabbitMQ exchange');

  //     await channel.assertExchange(exchangeName, 'direct', { durable: false });
  //     channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(gigStatusData)));

  //     console.log('Closing RabbitMQ channel');

  //     await channel.close();
  //   } catch (err) {
  //     console.error('Error publishing gig created event:', err);
  //   }
  // },
  async gigDeleteEvent(gigStatusData: any): Promise<void> {
    try {
      console.log('Starting RabbitMQ server');
      
      console.log('Creating RabbitMQ channel');

      const channel = await RabbitMQ.createChannel();
      const exchangeName = 'gig-exchange';
      const routingKey = 'gig-delete-created';

      console.log('Asserting RabbitMQ exchange delete');

      await channel.assertExchange(exchangeName, 'direct', { durable: false });
      channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(gigStatusData)));

      console.log('Closing RabbitMQ channel');

      await channel.close();
    } catch (err) {
      console.error('Error publishing gig created event:', err);
    }
  },  
  async gigStatusAcceptEvent(gigStatusAcceptData: any): Promise<void> {
    try {
      console.log('Starting RabbitMQ server');
      
      console.log('Creating RabbitMQ channel');

      const channel = await RabbitMQ.createChannel();
      const exchangeName = 'gig-exchange';
      const routingKey = 'gig-status-accept-created';

      console.log('Asserting RabbitMQ exchange');

      await channel.assertExchange(exchangeName, 'direct', { durable: false });
      channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(gigStatusAcceptData)));

      console.log('Closing RabbitMQ channel');

      await channel.close();
    } catch (err) {
      console.error('Error publishing gig created event:', err);
    }
  },
  async gigStatusRejectEvent(gigStatusRejectData: any): Promise<void> {
    try {
      console.log('Starting RabbitMQ server');
      
      console.log('Creating RabbitMQ channel');

      const channel = await RabbitMQ.createChannel();
      const exchangeName = 'gig-exchange';
      const routingKey = 'gig-status-reject-created';

      console.log('Asserting RabbitMQ exchange');

      await channel.assertExchange(exchangeName, 'direct', { durable: false });
      channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(gigStatusRejectData)));

      console.log('Closing RabbitMQ channel');

      await channel.close();
    } catch (err) {
      console.error('Error publishing gig created event:', err);
    }
  },
};

export default gigPublisher;