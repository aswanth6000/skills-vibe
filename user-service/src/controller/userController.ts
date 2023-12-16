import { Request, Response } from "express";
import { UserModel ,User } from "../models/User";
import bcrypt from 'bcrypt'
import cloudinary from '../config/cloudinary'
import jwt, { Secret ,JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwtSecret: Secret = process.env.JWT_KEY || 'defaultSecret'

interface ExtendedRequest extends Request {
    user?: {
      userId: string;
    };
  }

const userController = {
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
        console.log('sssssssssssssss',req.body);
        
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
        console.log('updated user data: ',user);
        
    
    
        res.status(200).json({ message: 'User profile updated successfully', user });
      } catch (error) {
        console.log('Error handling user profile update:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
}

export default userController