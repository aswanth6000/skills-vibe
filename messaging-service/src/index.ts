import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import messageController from './controller/messageontroller';

const app = express()
app.use(cors())
app.use(express.json());

messageController.userSave()


mongoose.connect("mongodb://localhost/messageservice")
.then(() => {
    console.log("Product-service database connected");
})
.catch((err) => {
    console.log("database connection failed :", err);
})

app.listen('8004', () => {
    console.log("messaging service listening on PORT 8004");
})