import {  channel, connection } from '../messages/rabbitMQ';




const userPublisher = {
    async userUpdatedEvent(updatedUserData: any): Promise<void> {
        try {
            channel.sendToQueue("USER", Buffer.from(JSON.stringify(updatedUserData)));
            await channel.close();
            await connection.close();
        } catch (error) {
            console.error('Error publishing user update  event:', error);
        }
}
}

export default userPublisher