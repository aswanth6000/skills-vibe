// consumer.ts
import * as amqp from 'amqplib';
import RabbitMQ from '../../../../messages/rabbitMQ';

interface UserLoggedInEvent {
    userId: string;
    timestamp: Date;
}

async function listenForUserLoggedInEvent() {
    try {
        console.log("Starting RabbitMQ consumer...");

        const channel = await RabbitMQ.createChannel();
        const exchangeName = 'user-exchange';
        const queueName = 'user-service-queue';

        console.log('Consumer setup started...');

        // Ensure the exchange is declared with the correct type and options
        await channel.assertExchange(exchangeName, 'direct', { durable: false });

        // Ensure the queue is declared with the correct options
        const { queue } = await channel.assertQueue(queueName, { durable: false });

        // Specify the routing key for binding
        const routingKey = 'user-logged-in';

        // Bind the queue to the exchange with the routing key
        await channel.bindQueue(queue, exchangeName, routingKey);

        console.log('Consumer setup completed. Waiting for user logged in events. To exit press CTRL+C');

        // Consume messages from the queue
        channel.consume(queue, (message) => {
            if (message) {
                try {
                    // Parse the message content
                    const userLoggedInEvent: UserLoggedInEvent = JSON.parse(message.content.toString());

                    // Log the received event
                    console.log('Received user logged in event:', userLoggedInEvent);

                    // Process the user logged in event
                    updateUserStatistics(userLoggedInEvent.userId);

                    // Acknowledge the message (mark it as processed)
                    channel.ack(message);
                } catch (error) {
                    console.error('Error processing user logged in event:', error);
                    // Acknowledge the message even if there's an error to prevent re-queueing
                    channel.ack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error setting up consumer:', error);
    }
}

function updateUserStatistics(userId: string) {
    // Your logic to update user statistics
    // ...
    console.log(`Updating statistics for user ${userId}`);
}

// Example: Call this function to start listening for user logged in events
listenForUserLoggedInEvent();
