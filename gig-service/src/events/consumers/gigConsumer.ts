import {  channel, connection } from '../messages/rabbitMQ';

const consumers = { 
    async listenForUserLoggedInEvent() {
        try {
          channel.consume("USER", (data) => {
            if(data){
                console.log("Data received : ", `${Buffer.from(data.content)}` );
                channel.ack(data)
                return JSON.parse(data.content.toString());
            }
        })
        } catch (error) {
            console.error('Error setting up consumer:', error);
        }
    }
}

export default consumers