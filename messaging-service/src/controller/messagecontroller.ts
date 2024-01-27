import { UserModel, User } from "../model/userModel"
import { chatModel } from "../model/chatModel"
import { Request, Response } from "express"
import userMessageConsumers from "../events/userMessageConsumer"
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { messageModel } from "../model/messageModel";

dotenv.config()

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
    console.log("userData", userData);
    await UserModel.findByIdAndUpdate(userData._id, { userData }, { new: true })
  },
  async accessChat(req: Request, res: Response) {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.status(400).json({ message: 'nouserFound' });
    }

    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    let decodedToken: JwtPayload;

    try {
      decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (jwtError) {
      console.log('JWT Verification Error:', jwtError);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    const myId = decodedToken.userId
    var isChat: any = await chatModel.find({
      $and: [
        { users: { $elemMatch: { $eq: myId } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users")
      .populate("latestMessage");

    isChat = await UserModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "username profilePicture email",
    });


    if (isChat.length > 0) {
      res.send(isChat[0]);

    } else {
      var chatData = {
        chatName: "sender",
        users: [myId, userId],
      };

      try {
        const createdChat = await chatModel.create(chatData);
        const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
          "users",
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400).json({ message: 'page not found' })
      }
    }
  },
  async fetchChats(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    let decodedToken: JwtPayload;

    try {
      decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (jwtError) {
      console.log('JWT Verification Error:', jwtError);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    try {
      chatModel.find({ users: { $elemMatch: { $eq: decodedToken.userId } } })
        .populate("users")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results: any) => {
          results = await UserModel.populate(results, {
            path: "latestMessage.sender",
            select: "username profilePicture email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  },
  async allMessages(req: Request, res: Response) {
    console.log("Params: ", req.params);
    try {
      const messages = await messageModel.find({ chat: req.params.chatId })
        .populate("sender", "username profilePicture email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  async sendMessage(req: Request, res: Response) {

    const { content, chatId } = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    let decodedToken: JwtPayload;

    try {
      decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (jwtError) {
      console.log('JWT Verification Error:', jwtError);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    console.log(content, chatId);


    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    var newMessage = {
      sender: decodedToken.userId,
      content: content,
      chat: chatId,
    };

    try {
      var message: any = await messageModel.create(newMessage);

      message = await message.populate("sender", "username profilePicture")
      message = await message.populate("chat")
      message = await UserModel.populate(message, {
        path: "chat.users",
        select: "username profilePicture email",
      });

      await chatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

      res.json(message);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal server error", error })
    }
  },
  async searchUsers(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    let decodedToken: JwtPayload;

    try {
      decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (jwtError) {
      console.log('JWT Verification Error:', jwtError);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    const keyword = req.query.search
      ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
      : {};

    const users = await UserModel.find(keyword).find({ _id: { $ne: decodedToken.userId } });
    res.send(users);
  },
  async meetingCodeGenerator(req: Request, res: Response) {
    try {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
    const randomChar = () => characters[Math.floor(Math.random() * characters.length)];

    const stringParts = [
      randomChar() + randomChar() + randomChar(),
      randomChar() + randomChar() + randomChar(),
      randomChar() + randomChar() + randomChar()
    ];

    const meetingCode = stringParts.join('-');
    res.status(200).json(meetingCode)
    } catch (error) {
      console.log(error);
      res.status(500).json("internal server error")
      
    }
  }

}

export default messageController;