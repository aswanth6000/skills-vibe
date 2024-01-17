import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import messageController from './controller/messagecontroller';
import router from './routes/messageRouter';
import dotenv from 'dotenv';
import {Server, Socket} from 'socket.io'

dotenv.config()

const app = express()
app.use(cors());
app.use(express.json());

messageController.userSave()
app.use(router);


mongoose.connect("mongodb://localhost/messageservice")
.then(() => {
    console.log("Product-service database connected");
})
.catch((err) => {
    console.log("database connection failed :", err);
})

const server = app.listen('8004', () => {
    console.log("messaging service listening on PORT 8004");
})

const io = new Server(server,{
    pingTimeout: 60000, 
    cors:{
        origin: "http://localhost:3000"
    }
})

io.on("connection", (Socket)=>{
    console.log("connected to socket io");
    Socket.on("setup", (userData)=>{
        Socket.join(userData?._id);
        Socket.emit("connected")
    })
    
})