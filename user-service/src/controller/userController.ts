import { Request, Response } from "express";
import { UserModel ,User } from "../models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface ExtendedRequest extends Request {
    user?: {
      userId: string;
    };
  }

const userController = {
    async getUserHome(req: ExtendedRequest ,res: Response) {
        const user = req.user;
        console.log("dsddddddddddddddddddddddddd",user);
        const userId = user?.userId
        const userData = await UserModel.findById(userId)
        res.status(200).send(userData)
        
        
    }
}

export default userController