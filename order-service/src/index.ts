import express from 'express';
import mongoose from 'mongoose'
import orderRouter from './routes/orderRoutes';
import cors from 'cors'
import orderController from './controllers/orderController';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json());


orderController.fetchOrderData()

app.use(orderRouter)

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
orderController.fetchOrderData();

app.listen(8003, ()=>{
    console.log(`server running on 8003`);
})