import express from 'express';
import userController from '../controller/userController';
import verifyToken from 'skill-vibe-express-jwt-auth'
import multerConfig from '../config/multer';

const userRouter = express.Router();

userRouter.get('/userhome', verifyToken, userController.getUserHome);
userRouter.get('/viewAllUsers', userController.getAllUsers)
userRouter.get('/viewallgigs', userController.getAllGigs)
userRouter.put('/userProfileUpdate', verifyToken, multerConfig.single('uploadPic'), userController.userProfileUpdate);
userRouter.get('/mygigs', userController.mygigs)
userRouter.get('/editgig/:gigId',userController.getgig)
userRouter.get('/getallgig', userController.getallgig)
userRouter.get('/viewgig/:id', userController.viewgig);
userRouter.get('/ordergig/:id', userController.orderGig)
userRouter.get('/viewgigdetail/:gigId', userController.viewgigdetail)
userRouter.post('/block', userController.userBlock)
userRouter.post('/unblock', userController.userUnblock)

export default userRouter;
