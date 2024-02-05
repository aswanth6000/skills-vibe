import {  channel, connection } from './messages/rabbitMQ';

const userMessageConsumers ={
    async userCreatedMessageConsumer(){
        try{
            channel.consume("USER", (data) => {
                if(data){
                    console.log("Data received : ", `${Buffer.from(data.content)}` );
                    channel.ack(data)
                    return JSON.parse(data.content.toString());
                }
            })
            
        }catch(err){
            console.error("error setting up consumer", err)
        }
    },
    async userUpdatedMessageConsumer(){
        try{
            channel.consume("USER", (data) => {
                if(data){
                    console.log("Data received : ", `${Buffer.from(data.content)}` );
                    channel.ack(data)
                    return JSON.parse(data.content.toString());
                }
            })
            
        }catch(err){
            console.error("error setting up consumer", err)
        }
    },
}

export default userMessageConsumers