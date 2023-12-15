import  express   from "express";
import userController from "../controller/userController";
import verifyToken from "../middleware/verifyToken";

const userRouter = express.Router()

userRouter.get('/userhome',verifyToken,userController.getUserHome)


export default userRouter