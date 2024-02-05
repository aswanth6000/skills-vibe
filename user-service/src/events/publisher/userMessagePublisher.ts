import {  channel, connection } from '../messages/rabbitMQ';

const userMessagePublisher = {

    async userMessageEvent(updatedUserData: any): Promise<void> {
        try {
            channel.sendToQueue("MESSAGE", Buffer.from(JSON.stringify(updatedUserData)));
            await channel.close();
            await connection.close();
        } catch (error) {
            console.error('Error publishing user messagee event:', error);
        }
},
    async userUpdateMessageEvent(updatedUserData: any): Promise<void> {
        try {
            channel.sendToQueue("MESSAGE", Buffer.from(JSON.stringify(updatedUserData)));
            await channel.close();
            await connection.close();
        } catch (error) {
            console.error('Error publishing user update messagee event:', error);
        }
},
}

export default userMessagePublisher