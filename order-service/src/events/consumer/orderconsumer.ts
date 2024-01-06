import RabbitMQ from '../../../../common/src/messages/rabbitMQ'

const orderConsumer = {
    async orderDetailsConsumer(){
        try{
            console.log("starting rabbit mq channel ");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'order-exchange';
            const queueName = 'order-service-queue';
            await channel.assertExchange(exchangeName, 'direct', {durable: false});
            const {queue} = await channel.assertQueue(queueName, {durable: false});
            const routingKey = 'order-created';
            await channel.bindQueue(queue ,exchangeName, routingKey);
            return new Promise((resolve ,reject)=>{
                channel.consume(queue, (message)=>{
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

}

export default orderConsumer