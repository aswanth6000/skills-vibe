import {  channel, connection } from '../messages/rabbitMQ';

const userGigConsumers ={
    async gigCreatedConsumer(){
        try{
            channel.consume("GIG", (data) => {
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
    async gigStatusConsumer(){
        try{
            channel.consume("GIG", (data) => {
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
    async gigDeleteConsumer(){
        try{
            channel.consume("GIG", (data) => {
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
    async gigAcceptConsumer(){
        try{
            channel.consume("GIG", (data) => {
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
    async gigRejectConsumer(){
        try{
            channel.consume("GIG", (data) => {
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

export default userGigConsumers;