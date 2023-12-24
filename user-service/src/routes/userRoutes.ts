import express from 'express';
import userController from '../controller/userController';
import verifyToken from '../middleware/verifyToken';
import multerConfig from '../config/multer';

const userRouter = express.Router();

userRouter.get('/userhome', verifyToken, userController.getUserHome);
userRouter.get('/viewAllUsers', userController.getAllUsers)
userRouter.get('/viewallgigs', userController.getAllGigs)
userRouter.put('/userProfileUpdate', verifyToken, multerConfig.single('uploadPic'), userController.userProfileUpdate);
userRouter.get('/mygigs', userController.mygigs)
userRouter.get('/editgig/:gigId',userController.getgig)

export default userRouter;
