import { UserModel, User } from "../model/userModel"
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
    }
}

export default messageController