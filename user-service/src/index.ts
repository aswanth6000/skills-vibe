import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/authRoutes'
import userRouter from './routes/userRoutes';
import userController from './controller/userController';
import cors from 'cors'
const app = express();
app.use(cors())


dotenv.config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
const PORT = process.env.PORT || 8001;

userController.setup()
app.use(router)
app.use(userRouter)



const mongoUrl: string | undefined = process.env.MONGO_URL

if (!mongoUrl) {
    console.error('MongoDB connection URL is not defined.');
    process.exit(1);
  }

mongoose.connect(mongoUrl).then(()=>{
    console.log('database connected..');
})
.catch((err)=>{
    console.log("Database connection error", err);
    
})



app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})