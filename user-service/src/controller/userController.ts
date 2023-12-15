import { Request, Response } from "express";
import { UserModel ,User } from "../models/User";
import bcrypt from 'bcrypt'
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

    async userProfileUpdate(req: Request, res: Response): Promise<void> {
      try {
        const { userId, username, email, phone, description, skills } = req.body;
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
    
        // Check if the user ID in the request matches the one in the token
        if (userId !== decodedToken.userId) {
          res.status(401).json({ error: 'Unauthorized - Invalid user ID' });
          return;
        }
    
        const user = await UserModel.findById(userId);
        console.log(user);
        
    
        if (!user) {
          res.status(404).json({ error: 'User not found' });
          return;
        }
    
        user.username = username;
        user.email = email;
        user.phone = phone;
        user.description = description;
        user.skills = skills;
    
        await user.save();
    
        res.status(200).json({ message: 'User profile updated successfully' });
      } catch (error) {
        console.error('Error handling user profile update:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
}

export default userController