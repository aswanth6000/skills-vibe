import express from 'express';
import userController from '../controller/userController';
import verifyToken from 'skill-vibe-express-jwt-auth'
import multerConfig from '../config/multer';

const userRouter = express.Router();

userRouter.get('/user/userhome', verifyToken, userController.getUserHome);
userRouter.get('/user/viewAllUsers', userController.getAllUsers)
userRouter.get('/user/viewallgigs', userController.getAllGigs)
userRouter.put('/user/userProfileUpdate', multerConfig.single('uploadPic'), userController.userProfileUpdate);
userRouter.get('/user/mygigs', userController.mygigs)
userRouter.get('/user/editgig/:gigId',userController.getgig)
userRouter.get('/user/getallgig', userController.getallgig) 
userRouter.get('/user/viewgig/:id', userController.viewgig);
userRouter.get('/user/ordergig/:id', userController.orderGig)
userRouter.get('/user/viewgigdetail/:gigId', userController.viewgigdetail)
userRouter.post('/user/block', userController.userBlock)
userRouter.post('/user/unblock', userController.userUnblock)
userRouter.get('/user/searchGig/:searchId', userController.searchgig)
userRouter.post('/user/userSpecficDetails', userController.userSpecficDetails)
userRouter.post('/user/viewGigDetail', userController.viewGigDetail)


export default userRouter;
