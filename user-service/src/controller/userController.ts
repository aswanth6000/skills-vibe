import { Request, Response } from "express";
import { UserModel ,User } from "../models/User";
import bcrypt from 'bcrypt'
import cloudinary from '../config/cloudinary'
import jwt, { Secret ,JwtPayload } from 'jsonwebtoken'
import userPublisher from "../events/publisher/userPublisher";
import userGigConsumers from "../events/consumer/userGigConsumer";
import { GigUserModel } from "../models/GigUser";
import dotenv from 'dotenv'
dotenv.config()

const jwtSecret: Secret = process.env.JWT_KEY || 'defaultSecret'

interface ExtendedRequest extends Request {
    user?: {
      userId: string;
    };
  }

const userController = {
  async setup() {
    try {
        const data: any = await userGigConsumers.gigCreatedConsumer();
        console.log("[User Controller]: Data received:", data);
        const userId  = data.userId;
        const user = await UserModel.findById(userId);
        if(user && data){
          const gigUserData = {
            userId: userId,
            username: user.username,
            phone: user.phone,
            description: user.description,
            email: user.email,
            profilePicture: user.profilePicture,
            status: user.status,
            skills: user.skills,
            availablity: user.availability,
            portfolio: user.portfolio,
            title: data.title,
            gigdescription: data.description,
            price: data.price,
            tags: data.tags,
            image1: data.image1,
            image2: data.image2,
            image3: data.image3,
            video: data.video,
            refId: data.refId
          }
          const newGigUser = new GigUserModel(gigUserData);
          const savedGigUser = newGigUser.save();
          console.log("gigAdded success", savedGigUser);
        }else{
          console.log("no user and data");
          
        }
        


        console.log('[User Controller]: RabbitMQ setup completed');
    } catch (error) {
        console.error('[User Controller]: Error setting up RabbitMQ:', error);
    }
},
    async gigStatusEvent() {
      try {
        const data: any = await userGigConsumers.gigStatusConsumer();
        console.log("lslslslls", data);
        const gigId = data.objectId;
        const statusData = {   
          status: data.status
        } 
        const objId = await GigUserModel.find({refId: gigId})

        const gig = await GigUserModel.findByIdAndUpdate(objId[0]._id, statusData, {new: true});
        
      } catch (error) {
       console.log(error);
        
      }
    },

    async getUserHome(req: ExtendedRequest ,res: Response) {
        const user = req.user;
        const userId = user?.userId
        const userData = await UserModel.findById(userId)
        res.status(200).send(userData)
        
        
    },

    async userProfileUpdate(req: any, res: Response) {
      try {
        const folderName = 'skillVibe';
        const updatedData = req.body;
        
        const token = req.headers.authorization?.split(' ')[1];
    
        if (!token) {
          res.status(401).json({ error: 'Unauthorized - Token not provided' });
          return;
        }
    
        let decodedToken: JwtPayload;
    
        try {
          decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
        } catch (jwtError) {
          console.error('JWT Verification Error:', jwtError);
          res.status(401).json({ error: 'Unauthorized - Invalid token' });
          return;
        }
    
        console.log('Decoded Token:', decodedToken);
    
        const userId = decodedToken.userId
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path, { public_id: `${folderName}/${req.file.originalname}` });
          updatedData.profilePicture = result.secure_url;
        }
    
        const user = await UserModel.findByIdAndUpdate(userId, updatedData, { new: true });
        userPublisher.userUpdatedEvent(updatedData)
        
        res.status(200).json({ message: 'User profile updated successfully', user });
      } catch (error) {
        console.log('Error handling user profile update:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },


    async getAllUsers(req: Request, res: Response){
      try {
        const allusers = await UserModel.find({});        
        res.status(200).json({message: 'user data fetched successfully', allusers})
      } catch (error) {
        console.log('Error handling user profile update:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

    },
    async getAllGigs(req: Request, res: Response){
      try {
        const allgigs = await GigUserModel.find()
        res.status(200).json({message: 'gig data fetched successfully', allgigs})
      } catch (error) {
        res.status(500).json({error: "internal server error"})
      }
    },
    async mygigs(req: Request, res: Response){
      try {
        const token = req.headers.authorization?.split(' ')[1];;
        if(!token){
          return res.status(401).json({error: 'unauthorized'})
        }
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload
        const userId = decoded.userId;
        const usergigs = await GigUserModel.find({userId: userId})
        res.status(200).json({message: 'success', usergigs})
      } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"})
      }
    },
    async getgig(req: Request, res: Response){
      try {
        const gigId = req.params.gigId
        const gigData = await GigUserModel.find({refId: gigId})
        console.log('ddddddddddddddddddddddddddddd',gigData);
        res.status(200).json(gigData);
      } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
        
      }
    }

}

export default userController