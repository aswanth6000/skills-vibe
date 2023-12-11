import { Request, Response } from "express";
import { UserModel } from "../models/User";
import jwt from 'jsonwebtoken'

const authController = {
  async getIndex(req: Request, res: Response) {
    res.send({ message: 'received' });
    const { email, displayName, google } = req.body;
    try {
      if (google === true) {
        const user = await UserModel.findOne({ email });

        if (!user) {
          // If the user doesn't exist, create a new account
          const newUser = new UserModel({
            username: displayName,
            email: email,
          });

          await newUser.save();

          console.log('User created');
          // Generate a JWT token
          const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

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
};

export default authController;
