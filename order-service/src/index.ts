import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import orderRouter from './routes/orderRoutes';
import cors from 'cors'
import orderController from './controllers/orderController';
const app = express();
app.use(cors())

dotenv.config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
const PORT = process.env.PORT || 8003;

// app.use(router)



const mongoUrl: string | undefined = process.env.MONGO_URL
app.use(orderRouter)

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

orderController.fetchOrderData()
app.use(orderRouter)

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})