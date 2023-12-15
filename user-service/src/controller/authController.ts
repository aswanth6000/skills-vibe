import { Request, Response } from "express";
import { UserModel } from "../models/User";
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwtSecret: Secret = process.env.JWT_KEY || 'defaultSecret'



const authController = {
// @DESC users can signup to the website by validation
// @METHOD  post
// @PATH /signup
  async signup(req: Request, res: Response) {
    const { email, username, google } = req.body;
    try {
      if (google === true) {
        const user = await UserModel.findOne({ email });

        if (!user) {
          const newUser = new UserModel({
            username: username,
            email: email,
          });

          await newUser.save();

          console.log('User created');
          const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

          res.status(201).json({ user: newUser, token });
        } else {
          console.log('User already exists');
          res.status(200).json({ user, message: 'User already exists.' });
        }
      } else {
        const { email, username, password, phone } = req.body;
        const user = await UserModel.findOne({ email });
        const hashedPassword = await bcrypt.hash(password, 10)
        if (!user) {
          
          const newUser = new UserModel({
            username: username,
            email: email,
            phone,
            password: hashedPassword,
            status: true
          });

          await newUser.save();

          console.log('User created');
          res.status(201).json({ user: 'created' });
        } else {
          console.log('User already exists');
          res.status(200).json({ message: 'User already exists.' });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

// @DESC users can login to the website by validation
// @METHOD  post
// @PATH /login

  async login(req: Request, res: Response) {
    const { email, password, google } = req.body;
    if (google === false) {
      try {
        const adminUserName = process.env.ADMIN;
        const adminPass = process.env.ADMIN_PASS;
        if (email === adminUserName && password === adminPass) {
          return res.status(204).json({ admin: 'admin data' });

        }else{
          const user = await UserModel.findOne({ email }).exec();
    
          if (!user) {
            return res.status(203).json({ message: 'User not found' });
          }
    
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            return res.status(203).json({ message: 'Invalid Password' });
          }
          const payload = {
            userId : user._id,
            email: user.email,
            username: user.username,
            status: user.status
          }
          const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
          res.cookie('jwt', token, { httpOnly: true, maxAge: 300000 }); 
          res.status(200).json({ token ,user });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  
    } else {
      const user = await UserModel.findOne({ email });
  
      if (user) {
        const payload = {
          userId : user._id,
          email: user.email,
          username: user.username,
          status: user.status
        }
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 300000 }); 
        res.status(200).json({ token  });
      } else {
        res.status(203).json({ message: 'Email not found' });
      }
    }
  }
  
};

export default authController;
