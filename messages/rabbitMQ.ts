// rabbitmq.ts
import * as amqp from 'amqplib';

class RabbitMQ {
  private static connection: amqp.Connection | null = null;

  static async getConnection(): Promise<amqp.Connection> {
    if (!RabbitMQ.connection) {
      RabbitMQ.connection = await amqp.connect('amqp://localhost');
    }
    return RabbitMQ.connection;
  }

  static async createChannel(): Promise<amqp.Channel> {
    const connection = await RabbitMQ.getConnection();
    return connection.createChannel();
  }
}

export default RabbitMQ;
