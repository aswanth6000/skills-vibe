import express from 'express';
import dotenv from 'dotenv'
import router from './routes/authRoutes'
import userRouter from './routes/userRoutes';
import userController from './controller/userController';
import { connectQueue } from './events/messages/rabbitMQ';
import cors from 'cors';
const app = express();
app.use(cors())


dotenv.config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
connectQueue() //RabbitMQ connection

userController.setup()
userController.gigAccept()
userController.gigReject()
userController.gigDeleteEvent()
app.use(router)
app.use(userRouter)

export {app}