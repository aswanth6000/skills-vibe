import {  channel, connection } from '../messages/rabbitMQ';


const orderConsumer = {
    async orderDetailsConsumer(){
        try{
            channel.consume("ORDER", (data) => {
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

export default orderConsumer