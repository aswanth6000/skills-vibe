import mongoose from "mongoose";
import {app} from './app'

const mongoUrl: string | undefined = process.env.MONGO_URL

if (!mongoUrl) {
    console.error('MongoDB connection URL is not defined.');
    process.exit(1);
  }

mongoose.connect(mongoUrl).then(()=>{
    console.log('order service database connected..');
})
.catch((err)=>{
    console.log("Order service Database connection error", err);
    
})
// orderController.orderReceived()


app.listen(8003, ()=>{
    console.log(`server running on 8003`);
})