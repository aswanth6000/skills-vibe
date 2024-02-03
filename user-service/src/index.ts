import { app } from "./app";
import mongoose from 'mongoose'

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

app.listen(8001, ()=>{
    console.log(`server running on 8001`);
})