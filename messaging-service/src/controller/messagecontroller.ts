import { UserModel, User } from "../model/userModel"
import { chatModel } from "../model/chatModel"
import { Request, Response } from "express"
import userMessageConsumers from "../events/userMessageConsumer"


const messageController = {
    async userSave(){
        const userData: any  = await userMessageConsumers.userCreatedMessageConsumer()
        console.log(userData);
        const newUser = new UserModel({
            userId: userData._id,
            username: userData.username,
            phone: userData.phone,
            email: userData.email,
            profilePicture: userData.profilePicture,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            status: userData.status,
        })
        await newUser.save()
    },
    async userUpdateSave(){
        const userData: any = await userMessageConsumers.userUpdatedMessageConsumer()
        await UserModel.findByIdAndUpdate({userId: userData._id}, {userData}, {new: true})
    },
    async accessChat(req:Request, res: Response){
        const {userId} = req.body;
        if (!userId) {
            console.log("UserId param not sent with request");
            return res.status(400).json({ message: 'nouserFound' });
        }
          var isChat = await chatModel.find({
            // $and: [
            //   { users: { $elemMatch: { $eq: req.user._id } } },
            //   { users: { $elemMatch: { $eq: userId } } },
            // ],
          })
            .populate("users")
            .populate("latestMessage");
    },
}

export default messageController