import RabbitMQ from "./messages/rabbitMQ";

const userMessageConsumers ={
    async userCreatedMessageConsumer(){
        try{
            console.log("starting rabbit mq channel ");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'user-message-exchange';
            const queueName = 'user-message-exchange';
            await channel.assertExchange(exchangeName, 'direct', {durable: false});
            const {queue} = await channel.assertQueue(queueName, {durable: false});
            const routingKey = 'user-message-created';
            await channel.bindQueue(queue ,exchangeName, routingKey);
            return new Promise((resolve ,reject)=>{
                channel.consume(queue, (message: any)=>{
                    if(message){
                        try {
                            const createdGig: any = JSON.parse(message.content.toString());
                            channel.ack(message);
                            resolve(createdGig)
                        } catch (error) {
                            console.error("error processing gig creation");
                            channel.ack(message);
                            reject(error)
                        }
                    }
                })
            })
            await channel.close()
            
        }catch(err){
            console.error("error setting up consumer", err)
        }
    },
    async userUpdatedMessageConsumer(){
        try{
            console.log("starting rabbit mq channel ");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'user-update-message-exchange';
            const queueName = 'user-update-message-exchange';
            await channel.assertExchange(exchangeName, 'direct', {durable: false});
            const {queue} = await channel.assertQueue(queueName, {durable: false});
            const routingKey = 'user-update-message-created';
            await channel.bindQueue(queue ,exchangeName, routingKey);
            return new Promise((resolve ,reject)=>{
                channel.consume(queue, (message: any)=>{
                    if(message){
                        try {
                            const createdGig: any = JSON.parse(message.content.toString());
                            channel.ack(message);
                            resolve(createdGig)
                        } catch (error) {
                            console.error("error processing user message creation");
                            channel.ack(message);
                            reject(error)
                        }
                    }
                })
            })
            await channel.close()
            
        }catch(err){
            console.error("error setting up consumer", err)
        }
    },
}

export default userMessageConsumers