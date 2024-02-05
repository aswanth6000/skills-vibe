import {  channel, connection } from '../messages/rabbitMQ';

const gigPublisher = {
  async gigCreatedEvent(gigCreatedData: any): Promise<void> {
    try {
      channel.sendToQueue("GIG", Buffer.from(JSON.stringify(gigCreatedData)));
      await channel.close();
      await connection.close();
    } catch (err) {
      console.error('Error publishing gig created event:', err);
    }
  },
  async gigDeleteEvent(gigStatusData: any): Promise<void> {
    try {
      channel.sendToQueue("GIG", Buffer.from(JSON.stringify(gigStatusData)));
      await channel.close();
      await connection.close();
    } catch (err) {
      console.error('Error publishing gig created event:', err);
    }
  },  
  async gigStatusAcceptEvent(gigStatusAcceptData: any): Promise<void> {
    try {
      channel.sendToQueue("GIG", Buffer.from(JSON.stringify(gigStatusAcceptData)));
      await channel.close();
      await connection.close();
    } catch (err) {
      console.error('Error publishing gig created event:', err);
    }
  },
  async gigStatusRejectEvent(gigStatusRejectData: any): Promise<void> {
    try {
      channel.sendToQueue("GIG", Buffer.from(JSON.stringify(gigStatusRejectData)));
      await channel.close();
      await connection.close();
    } catch (err) {
      console.error('Error publishing gig created event:', err);
    }
  },
};

export default gigPublisher;
