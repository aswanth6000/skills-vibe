import { Request, Response } from "express";
import { UserModel, User } from "../models/User";
import bcrypt from 'bcrypt'
import cloudinary from '../config/cloudinary'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import userPublisher from "../events/publisher/userPublisher";
import userGigConsumers from "../events/consumer/userGigConsumer";
import { GigUserModel } from "../models/GigUser";
import dotenv from 'dotenv';
import orderPublisher from "../events/publisher/orderPublisher";
dotenv.config();
import { ExtendedRequest } from "../types/usertypes";
import userMessagePublisher from "../events/publisher/userMessagePublisher";
import { title } from "process";


const jwtSecret: Secret = process.env.JWT_KEY || 'defaultSecret'



const userController = {
  // @DESC function for creating giguser collection using the data comming from rabbitmq 
  async setup() {
    try {
      const data: any = await userGigConsumers.gigCreatedConsumer();
      console.log("[User Controller]: Data received:", data);
      const userId = data.userId;
      const user = await UserModel.findById(userId);
      if (user && data) {
        const gigUserData = {
          userId: userId,
          username: user.username,
          phone: user.phone,
          description: user.description,
          email: user.email,
          profilePicture: user.profilePicture,
          status: user.status,
          skills: user.skills,
          availablity: user.availability,
          portfolio: user.portfolio,
          title: data.title,
          gigdescription: data.gigdescription,
          gigstatus: data.status,
          price: data.price,
          tags: data.tags,
          image1: data.image1,
          image2: data.image2,
          image3: data.image3,
          video: data.video,
          refId: data.refId
        }
        const newGigUser = new GigUserModel(gigUserData);
        const savedGigUser = await newGigUser.save();
        console.log("gigAdded success", savedGigUser);
      } else {
        console.log("no user and data");

      }
      console.log('[User Controller]: RabbitMQ setup completed');
    } catch (error) {
      console.error('[User Controller]: Error setting up RabbitMQ:', error);
    }
  },
  // @DESC option to change the gig status accroding to the data comming form rabbitmq
  async gigStatusEvent() {
    try {
      const data: any = await userGigConsumers.gigStatusConsumer();
      console.log("lslslslls", data);
      const gigId = data.objectId;
      const statusData = {
        status: data.status
      }
      const objId = await GigUserModel.find({ refId: gigId })

      const gig = await GigUserModel.findByIdAndUpdate(objId[0]._id, statusData, { new: true });

    } catch (error) {
      console.log(error);

    }
  },
  // @DESC option to delete the gig from database
  async gigDeleteEvent() {
    try {
      const data: any = await userGigConsumers.gigDeleteConsumer();
      const gigId = data;

      const objId = await GigUserModel.find({ refId: gigId })
      const gig = await GigUserModel.findByIdAndDelete(objId[0]._id);
      console.log("gig deleted from usergig database");
    } catch (error) {
      console.log(error);

    }
  },
  // @DESC user route that will be redirectrd to the user homne after login 
  // @METHOD  get
  // @PATH /userhome
  async getUserHome(req: ExtendedRequest, res: Response) {
    const user = req.user;
    const userId = user?.userId
    const userData = await UserModel.findById(userId)
    res.status(200).send(userData)


  },
  // @DESC users can edit their profile picture
  // @METHOD  post
  // @PATH /userprovile/:userId

  async userProfileUpdate(req: any, res: Response) {
    try {
      const folderName = 'skillVibe';
      const updatedData = req.body;
      console.log(req.body);


      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        res.status(401).json({ error: 'Unauthorized - Token not provided' });
        return;
      }

      let decodedToken: JwtPayload;

      try {
        decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
      } catch (jwtError) {
        console.error('JWT Verification Error:', jwtError);
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
        return;
      }
      const userId = decodedToken.userId
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, { public_id: `${folderName}/${req.file.originalname}` });
        updatedData.profilePicture = result.secure_url;
      }
      console.log("updated data: ", updatedData);


      const user = await UserModel.findByIdAndUpdate(userId, updatedData, { new: true });
      console.log("user", user);

      userPublisher.userUpdatedEvent(updatedData)
      userMessagePublisher.userUpdateMessageEvent(updatedData)

      res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
      console.log('Error handling user profile update:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // @DESC admin can view all users
  // @METHOD  get
  // @PATH /getallusers
  async getAllUsers(req: Request, res: Response) {
    try {
      const PAGE_SIZE = 10
      const page: number = parseInt(req.query.page as string || '0', 10);   
      const total = await UserModel.countDocuments({})
      const allusers = await UserModel.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page)
      res.status(200).json({ message: 'user data fetched successfully', allusers, totalPages: Math.ceil(total / PAGE_SIZE) })
    } catch (error) {
      console.log('Error handling user profile update:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  },
  // @DESC admin can view all gigs
  // @METHOD  get
  // @PATH /getallgigs
  async getAllGigs(req: Request, res: Response) {
    try {
      const PAGE_SIZE = 10
      const page: number = parseInt(req.query.page as string || '0', 10);            
      const total = await GigUserModel.countDocuments({})
      const allgigs = await GigUserModel.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page)
      res.status(200).json({ message: 'gig data fetched successfully', allgigs, totalPages: Math.ceil(total / PAGE_SIZE) })
    } catch (error) {
      res.status(500).json({ error: "internal server error" })
    }
  },

  // @DESC users can view their gigs
  // @METHOD  get
  // @PATH /mygigs
  async mygigs(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'unauthorized' })
      }
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload
      const userId = decoded.userId;
      const usergigs = await GigUserModel.find({ userId: userId })
      res.status(200).json({ message: 'success', usergigs })
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" })
    }
  },
  // @DESC user can view their gigs
  // @METHOD  get
  // @PATH /getgig
  async getgig(req: Request, res: Response) {
    try {
      const gigId = req.params.gigId
      const gigData = await GigUserModel.find({ refId: gigId })
      res.status(200).json(gigData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" })

    }
  },
  // @DESC list all gigs listed by the user 
  // @METHOD  get
  // @PATH /getallgig
  async getallgig(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: "unauthorized access no token" })
      }
      const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
      const userId = decodedToken.userId;
      const allgigs = await GigUserModel.find({ userId: { $ne: userId }, status: true })
      return res.status(200).json({ message: 'fetched Successfully', allgigs })

    } catch (err) {
      console.log(err);

    }
  },
  // @DESC user can view the selected gig
  // @METHOD  get
  // @PATH /viewgig/:gigId
  async viewgig(req: Request, res: Response) {
    try {
      const gigId = req.params.id;
      const gig = await GigUserModel.find({ refId: gigId })
      return res.status(200).json({ message: 'success', gig })
    } catch (error) {
      console.log(error);
      return res.status(500).json("internal server error")
    }
  },
  // @DESC user can order gig
  // @METHOD  order a specific gig
  // @PATH /ordergig
  async orderGig(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized access, no token' });
      }

      const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
      const buyerId = decodedToken.userId;

      const buyer = await UserModel.findById(buyerId);

      const gigId = req.params.id;

      const gig = await GigUserModel.findOne({ refId: gigId });

      if (!gig) {
        return res.status(404).json({ message: 'Gig not found' });
      }

      const orderDetails = {
        ...gig.toObject(),
        buyerId,
        buyername: buyer?.username,
        buyeremail: buyer?.email,
        buyerphone: buyer?.phone,
        buyerProfile: buyer?.profilePicture,
      };
      orderPublisher.orderEvent(orderDetails)
      return res.status(200).json({ orderDetails });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  // @DESC view gig in detail 
  // @METHOD  get
  //  @PATH /viewgigdetal
  async viewgigdetail(req: Request, res: Response) {
    try {
      const gigId = req.params.gigId;
      const gig = await GigUserModel.find({ refId: gigId })
      return res.status(200).json({ message: 'Success', gig })
    } catch (error) {
      console.log(error);
      return res.status(501).json({ message: 'Internal error' })
    }
  },
  // @DESC selller can accept the gig
  // @METHOD  post
  // @PATH /gigaccept
  async gigAccept() {
    const gigId = await userGigConsumers.gigAcceptConsumer()
    console.log('recieved gig id', gigId);
    const gig = await GigUserModel.findOneAndUpdate({ refId: gigId }, { gigstatus: true }, { new: true })
    console.log('accept status updated success', gig);
  },
  // @DESC seller can reject the order
  // @METHOD  post
  // @PATH /gigreject
  async gigReject() {
    const gigId = await userGigConsumers.gigAcceptConsumer()
    console.log('recieved gig id', gigId);
    const gig = await GigUserModel.findOneAndUpdate({ refId: gigId }, { gigstatus: false }, { new: true })
    console.log('accept status updated success', gig);
  },
  // @DESC admin can block the user
  // @METHOD  post
  // @PATH /userblock
  async userBlock(req: Request, res: Response) {
    const { userId } = req.body;
    try {
      const user = await UserModel.findByIdAndUpdate(userId, { status: false })
      return res.status(200).json({ message: "user blocked" })
    } catch (error) {
      console.error(error);
    }
  },
  // @DESC admin can unmblock the user
  // @METHOD  post
  // @PATH /userUnlock
  async userUnblock(req: Request, res: Response) {
    const { userId } = req.body
    try {
      console.log(userId);
      const user = await UserModel.findByIdAndUpdate(userId, { status: true })
      return res.status(200).json({ message: "user un blocked" })
    } catch (error) {
      console.error(error);
    }
  },
  // @DESC user can be able to search for the user and gig
  // @METHOD  get
  // @PATH /searchgig
  async searchgig(req: Request, res: Response) {
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
      const sort = req.query.sort;
      const filterPrice = req.query.price || 500;
    
      const keyword = req.params.searchId
        ? {
            $or: [
              { username: { $regex: req.params.searchId, $options: "i" } },
              { title: { $regex: req.params.searchId, $options: "i" } },
            ],
          }
        : {};
    
      let priceFilter = {};
    
      if (filterPrice) {
        // Assuming filterPrice is a single value
        priceFilter = { price: { $lt: filterPrice } };
      }
    
      if (sort === 'High to low') {
        const users = await GigUserModel.find(keyword)
          .find({ _id: { $ne: decodedToken.userId }, ...priceFilter })
          .sort({ price: -1 });
        res.status(200).json(users);
      } else if (sort === 'Low to high') {
        const users = await GigUserModel.find(keyword)
          .find({ _id: { $ne: decodedToken.userId }, ...priceFilter })
          .sort({ price: 1 });
        res.status(200).json(users);
      } else {
        const users = await GigUserModel.find(keyword)
          .find({ _id: { $ne: decodedToken.userId }, ...priceFilter })
          .exec();
        res.status(200).json(users);
      }
    } catch (error) {
      res.status(501).json({ error: "Internal server error" });
      console.error(error);
    }
  },
  // @DESC user can view their user secfic details here
  // @METHOD  post
  // @PATH /usespecificdetails
  async userSpecficDetails(req: Request, res: Response){
    const {userId} = req.body
    try {
      const users = await UserModel.findById(userId)
      res.status(200).json(users)
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Internal server error"})
    }
  },
  // @DESC user can view the gig detail
  // @METHOD  post
  // @PATH /viewgigdetail
  async viewGigDetail(req: Request, res: Response){
    const {gigId} = req.body    
    try {
      const gigData = await GigUserModel.find({refId: gigId})
      res.status(200).json(gigData)
    } catch (error) {
      res.status(500).json({message: "Internal server error"})
      console.error(error);
    }
  }
}

export default userController