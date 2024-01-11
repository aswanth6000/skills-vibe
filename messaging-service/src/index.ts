import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express()
app.use(cors())
app.use(express.json());


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