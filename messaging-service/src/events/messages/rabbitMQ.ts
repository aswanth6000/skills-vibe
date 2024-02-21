// rabbitmq.ts
import * as amqp from 'amqplib';
const rabbitURL: any = 'amqps://dfnadvly:a1Q2OitA_xOdJZg8SSPYuMrXFdQXhi3k@puffin.rmq2.cloudamqp.com/dfnadvly'
// const rabbitURL: any = 'amqp://localhost:5672';

class RabbitMQ {
  private static connection: amqp.Connection | null = null;

  static async getConnection(): Promise<amqp.Connection> {
    try {
      if (!RabbitMQ.connection) {
        RabbitMQ.connection = await amqp.connect(rabbitURL);
      }
      return RabbitMQ.connection as amqp.Connection
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async createChannel(): Promise<amqp.Channel> {
    try {
      const connection = await RabbitMQ.getConnection();
      return connection.createChannel();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default RabbitMQ;