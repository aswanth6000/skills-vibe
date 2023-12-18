import { Request, Response } from 'express';
import consumers from '../events/consumers/gigConsumer';
import gigPublisher from '../events/publishers/gigPublisher';
import jwt from 'jsonwebtoken'
import { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const jwtSecret: Secret = process.env.JWT_KEY || 'defaultSecret'

const gigController = {
    async addGig(req: Request, res: Response) {
        try {
            // const loginEvnt: any = await consumers.listenForUserLoggedInEvent();
            // console.log('kkkkk', loginEvnt.userId);
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                res.status(401).json({ error: 'Unauthorized - Token not provided' });
                return;
              }
          
              let decodedToken: JwtPayload;
          
              try {
                decodedToken =  jwt.verify(token, jwtSecret) as JwtPayload;
              } catch (jwtError) {
                console.error('JWT Verification Error:', jwtError);
                res.status(401).json({ error: 'Unauthorized - Invalid token' });
                return;
              }
          
              console.log('Decoded Token:', decodedToken);
          
              const userId = decodedToken.userId
              const data = req.body
              data.userId = userId
            console.log("data from gig service",data);
            res.status(200).json({});
            gigPublisher.gigCreatedEvent(data);
            console.log('data sent to publisher is ',data);
            
        } catch (error) {
            console.error('Error in addGig:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

export default gigController;