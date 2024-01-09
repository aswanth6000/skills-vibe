import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors())
app.use(express.json());



app.listen('8004', ()=>{
    console.log("messaging service listening on PORT 8004");
})