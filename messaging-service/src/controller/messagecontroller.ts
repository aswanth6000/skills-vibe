import { UserModel, User } from "../model/userModel"
import { chatModel } from "../model/chatModel"
import { Request, Response } from "express"
import userMessageConsumers from "../events/userMessageConsumer"
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const jwtSecret: Secret = process.env.JWT_KEY || 'defaultSecret'


const messageController = {
  async userSave() {
    const userData: any = await userMessageConsumers.userCreatedMessageConsumer()
    const newUser = new UserModel({
      _id: userData._id,
      username: userData.username,
      phone: userData.phone,
      email: userData.email,
      profilePicture: userData.profilePicture,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      status: userData.status,
    })
    await newUser.save()
    return
  },
  async userUpdateSave() {
    const userData: any = await userMessageConsumers.userUpdatedMessageConsumer()
    await UserModel.findByIdAndUpdate(userData._id, { userData }, { new: true })
  },
  async accessChat(req: Request, res: Response) {
  //   const { userId } = req.body;
  //   if (!userId) {
  //     console.log("UserId param not sent with request");
  //     return res.status(400).json({ message: 'nouserFound' });
  //   }

  //   const token = req.headers.authorization?.split(' ')[1]
  //   if (!token) {
  //     return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  //   }

  //   let decodedToken: JwtPayload;

  //   try {
  //     decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
  //   } catch (jwtError) {
  //     console.log('JWT Verification Error:', jwtError);
  //     return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  //   }

  //   console.log('Decoded Token:', decodedToken);
  //   const myId = decodedToken.userId
  //   var isChat: any = await chatModel.find({
  //     $and: [
  //       { users: { $elemMatch: { $eq: myId } } },
  //       { users: { $elemMatch: { $eq: userId } } },
  //     ],
  //   })
  //     .populate("users")
  //     .populate("latestMessage");

  //   isChat = await UserModel.populate(isChat, {
  //     path: "latestMessage.sender",
  //     select: "username, profilePicture, email",
  //   });

  //   if (isChat.length > 0) {
  //     res.send(isChat[0]);
  //   } else {
  //     var chatData = {
  //       chatName: "sender",
  //       isGroupChat: false,
  //       users: [myId, userId],
  //     };

  //     try {
  //       const createdChat = await chatModel.create(chatData);
  //       const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
  //         "users",
  //       );
  //       res.status(200).json(FullChat);
  //     } catch (error) {
  //       res.status(400).json({message: 'page not found'})
  //     }
  //   }
  // },
  console.log('sdfsedf');
  
  },
  test(req: Request, res: Response){
    console.log("hello");
    
  }
}

export default messageController