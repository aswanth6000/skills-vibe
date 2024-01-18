import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';


const app = express()
app.use(cors())
app.use(express.json());

app.use('/', proxy("http://localhost:8001"));
// app.use('/gig', proxy("http://localhost:8002"));
// app.use('/order', proxy("http://localhost:8003"));
app.use('/message', proxy("http://localhost:8004"));

app.listen('8000', ()=>{
    console.log("API Gateway Listening On Port 8000");
})