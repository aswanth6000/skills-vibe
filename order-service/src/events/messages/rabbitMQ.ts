// rabbitmq.ts
import * as amqp from 'amqplib';
import dotenv from 'dotenv'
dotenv.config();


const rabbitURL: any = process.env.RABBIT_MQ
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
