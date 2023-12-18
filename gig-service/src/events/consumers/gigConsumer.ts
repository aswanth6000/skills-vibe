
import RabbitMQ from '../../../../messages/rabbitMQ';

interface UserLoggedInEvent {
    userId: string;
    timestamp: Date;
}
const consumers = { 
    async listenForUserLoggedInEvent() {
        try {
            console.log("Starting RabbitMQ consumer...");
    
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'user-exchange';
            const queueName = 'user-service-queue';
                await channel.assertExchange(exchangeName, 'direct', { durable: false });
                const { queue } = await channel.assertQueue(queueName, { durable: false });
                const routingKey = 'user-logged-in';
                await channel.bindQueue(queue, exchangeName, routingKey);
        
                return new Promise((resolve, reject) => {
                    channel.consume(queue, (message) => {
                      if (message) {
                        try {
                          const userLoggedInEvent: UserLoggedInEvent = JSON.parse(message.content.toString());
                          channel.ack(message);
                          resolve(userLoggedInEvent);
                        } catch (error) {
                          console.error('Error processing user logged in event:', error);
                          channel.ack(message);
                          reject(error);
                        }
                      }
                    });
                  });
        } catch (error) {
            console.error('Error setting up consumer:', error);
        }
    }
}

export default consumers