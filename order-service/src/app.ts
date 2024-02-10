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


orderController.fetchOrderData()

app.use(orderRouter)

// app.use(router)


export {app}