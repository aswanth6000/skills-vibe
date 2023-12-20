import express from 'express';
import userController from '../controller/userController';
import verifyToken from '../middleware/verifyToken';
import multerConfig from '../config/multer';

const userRouter = express.Router();

userRouter.get('/userhome', verifyToken, userController.getUserHome);
userRouter.get('/viewAllUsers', userController.getAllUsers)
userRouter.put('/userProfileUpdate', verifyToken, multerConfig.single('uploadPic'), userController.userProfileUpdate);

export default userRouter;
