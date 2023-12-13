import { Request, Response } from "express";
import { UserModel } from "../models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwtSecret: string | undefined = process.env.JWT_KEY || 'defaultSecret'

const authController = {
  async signup(req: Request, res: Response) {
    const { email, username, google } = req.body;
    try {
      if (google === true) {
        const user = await UserModel.findOne({ email });

        if (!user) {
          // If the user doesn't exist, create a new account
          const newUser = new UserModel({
            username: username,
            email: email,
          });

          await newUser.save();

          console.log('User created');
          // Generate a JWT token
          const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

          res.status(201).json({ user: newUser, token });
        } else {
          // If the user already exists, send existing data
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
            password: hashedPassword
          });

          await newUser.save();

          console.log('User created');
          // Generate a JWT token
          const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

          res.status(201).json({ user: newUser, token });
        } else {
          // If the user already exists, send existing data
          console.log('User already exists');
          res.status(200).json({ user, message: 'User already exists.' });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email }).exec(); // Execute the query

      if (!user) {
        return res.status(203).json({ message: "User not found" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(203).json({ message: "Invalid Password" });

      const token = jwt.sign({userId: user._id}, jwtSecret, {expiresIn: '1h'})
      res.status(200).json({user: user, token})

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
};

export default authController;
