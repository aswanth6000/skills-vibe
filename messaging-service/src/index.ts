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

// messageController.userSave()
app.use(router);


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

const server = app.listen('8004', () => {
    console.log("messaging service listening on PORT 8004");
})

const io = new Server(server,{
    pingTimeout: 60000, 
    cors:{
        origin: "https://skills-vibe.vercel.app/ "
    }
})

io.on("connection", (Socket)=>{
    console.log("connected to socket io");
    Socket.on("setup", (userData)=>{
        Socket.join(userData?._id);
        Socket.emit("connected")
    })
    Socket.on("join chat", (room)=>{
        Socket.join(room);
        console.log("User joined room " + room);
    })
    Socket.on("typing", (room)=>Socket.in(room).emit("typing"))
    Socket.on("stop typing", (room)=>Socket.in(room).emit("stop typing"))

    Socket.on("new message", (newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;
        if(!chat?.users) return console.log("chat.users not defined ");
        chat.users.forEach((user: any)=> {
            if(user._id == newMessageRecieved.sender._id) return 
            Socket.in(user._id).emit("message recieved ", newMessageRecieved);            
        });
    })
    Socket.off("setup", (userData)=>{
        console.log("User Disconnected");
        Socket.leave(userData._id)
    })
})