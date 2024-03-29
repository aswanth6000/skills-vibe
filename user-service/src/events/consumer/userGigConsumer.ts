import RabbitMQ from "../messages/rabbitMQ";

const userGigConsumers ={
    async gigCreatedConsumer(){
        try{
            console.log("starting rabbit mq channel ");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'gig-exchange';
            const queueName = 'gig-service-queue';
            await channel.assertExchange(exchangeName, 'direct', {durable: false});
            const {queue} = await channel.assertQueue(queueName, {durable: false});
            const routingKey = 'gig-created';
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
    async gigStatusConsumer(){
        try{
            console.log("starting rabbit mq channel ");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'gig-exchange';
            const queueName = 'gig-service-queue';
            await channel.assertExchange(exchangeName, 'direct', {durable: false});
            const {queue} = await channel.assertQueue(queueName, {durable: false});
            const routingKey = 'gig-status-created';
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
    async gigDeleteConsumer(){
        try{
            console.log("starting rabbit mq channel ");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'gig-exchange';
            const queueName = 'gig-delete-queue';
            await channel.assertExchange(exchangeName, 'direct', {durable: false});
            const {queue} = await channel.assertQueue(queueName, {durable: false});
            const routingKey = 'gig-delete-created';
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
    async gigAcceptConsumer(){
        try{
            console.log("starting rabbit mq channel ");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'gig-exchange';
            const queueName = 'gig-accept-queue';
            await channel.assertExchange(exchangeName, 'direct', {durable: false});
            const {queue} = await channel.assertQueue(queueName, {durable: false});
            const routingKey = 'gig-status-accept-created';
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
    async gigRejectConsumer(){
        try{
            console.log("starting rabbit mq channel ");
            const channel = await RabbitMQ.createChannel();
            const exchangeName = 'gig-exchange';
            const queueName = 'gig-reject-queue';
            await channel.assertExchange(exchangeName, 'direct', {durable: false});
            const {queue} = await channel.assertQueue(queueName, {durable: false});
            const routingKey = 'gig-status-reject-created';
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
}

export default userGigConsumers;