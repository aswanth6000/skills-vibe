var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/app.ts
import express3 from "express";
import dotenv5 from "dotenv";

// src/routes/authRoutes.ts
import express from "express";

// src/models/User.ts
import { Schema, model, Types } from "mongoose";
var skillSchema = new Schema({
  value: String,
  label: String
});
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  otp: {
    type: String
  },
  phone: {
    type: Number
  },
  description: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  profilePicture: {
    type: String,
    default: "https://res.cloudinary.com/dihrwghx2/image/upload/v1699291554/admin-user-react/default-pic_rkk3gl.jpg"
  },
  role: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  },
  clients: [{
    type: Types.ObjectId,
    ref: "User"
    // Assuming 'User' is the name of the model
  }],
  skills: {
    type: [skillSchema],
    // Expecting an array of skillSchema objects
    default: []
  },
  availability: {
    type: Boolean
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: "Portfolio"
    // Assuming 'Portfolio' is the name of the model
  },
  orders: {
    type: Schema.Types.ObjectId
  },
  ordersRecieved: {
    type: Schema.Types.ObjectId
  }
});
var UserModel = model("User", userSchema);

// src/controller/authController.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv2 from "dotenv";

// src/config/nodemailer.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
var EMAIL = process.env.EMAIL;
var EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD
  }
});
var nodemailer_default = transporter;

// src/events/messages/rabbitMQ.ts
import * as amqp from "amqplib";
var rabbitURL = process.env.RABBIT_MQ;
var channel;
var connection;
var connectQueue = () => __async(void 0, null, function* () {
  try {
    connection = yield amqp.connect(rabbitURL);
    channel = yield connection.createChannel();
    yield channel.assertQueue("ORDER");
  } catch (error) {
    console.log(error);
  }
});

// src/events/publisher/userMessagePublisher.ts
var userMessagePublisher = {
  userMessageEvent(updatedUserData) {
    return __async(this, null, function* () {
      try {
        channel.sendToQueue("MESSAGE", Buffer.from(JSON.stringify(updatedUserData)));
        yield channel.close();
        yield connection.close();
      } catch (error) {
        console.error("Error publishing user messagee event:", error);
      }
    });
  },
  userUpdateMessageEvent(updatedUserData) {
    return __async(this, null, function* () {
      try {
        channel.sendToQueue("MESSAGE", Buffer.from(JSON.stringify(updatedUserData)));
        yield channel.close();
        yield connection.close();
      } catch (error) {
        console.error("Error publishing user update messagee event:", error);
      }
    });
  }
};
var userMessagePublisher_default = userMessagePublisher;

// src/controller/authController.ts
dotenv2.config();
var jwtSecret = process.env.JWT_KEY || "defaultSecret";
var authController = {
  // @DESC users can signup to the website by validation
  // @METHOD  post
  // @PATH /signup
  signup(req, res) {
    return __async(this, null, function* () {
      const { email, username, google } = req.body;
      try {
        if (google === true) {
          const user = yield UserModel.findOne({ email });
          if (!user) {
            const newUser = new UserModel({
              username,
              email
            });
            yield newUser.save();
            userMessagePublisher_default.userMessageEvent(newUser);
            console.log("User created");
            const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: "1h" });
            res.status(201).json({ user: newUser, token });
          } else {
            console.log("User already exists");
            res.status(400).json({ user, message: "User already exists." });
          }
        } else {
          const { email: email2, username: username2, password, phone } = req.body;
          const user = yield UserModel.findOne({ email: email2 });
          const hashedPassword = yield bcrypt.hash(password, 10);
          if (!user) {
            const newUser = new UserModel({
              username: username2,
              email: email2,
              phone,
              password: hashedPassword,
              status: true
            });
            yield newUser.save();
            userMessagePublisher_default.userMessageEvent(newUser);
            console.log("User created");
            res.status(201).json({ user: "created" });
          } else {
            console.log("User already exists");
            res.status(400).json({ message: "User already exists." });
          }
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });
  },
  // @DESC users can login to the website by validation
  // @METHOD  post
  // @PATH /login
  login(req, res) {
    return __async(this, null, function* () {
      const { email, password, google } = req.body;
      if (google === false) {
        try {
          const adminUserName = process.env.ADMIN;
          const adminPass = process.env.ADMIN_PASS;
          if (email === adminUserName && password === adminPass) {
            const role = "admin";
            const payload = {
              admin: adminUserName,
              role
            };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
            return res.status(204).json({ token, admin: "admin data" });
          } else {
            const role = "user";
            const user = yield UserModel.findOne({ email }).exec();
            if (!user) {
              return res.status(400).json({ message: "User not found" });
            }
            if (!user.status) {
              return res.status(207).json({ message: "User is blocked by admin" });
            }
            const validPassword = yield bcrypt.compare(password, user.password);
            if (!validPassword) {
              return res.status(400).json({ message: "Invalid Password" });
            }
            const payload = {
              userId: user._id,
              email: user.email,
              username: user.username,
              status: user.status,
              role
            };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
            res.cookie("jwt", token, { httpOnly: true, maxAge: 3e5 });
            try {
              console.log("User logged in event published successfully");
            } catch (error) {
              console.error("Error publishing user logged in event:", error);
              res.status(500).json({ error: "Internal Server Error" });
            }
            console.log("event publish call");
            res.status(200).json({ token, user });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
        }
      } else {
        const user = yield UserModel.findOne({ email });
        if (user) {
          const payload = {
            userId: user._id,
            email: user.email,
            username: user.username,
            status: user.status
          };
          const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
          res.cookie("jwt", token, { httpOnly: true });
          res.status(200).json({ token });
        } else {
          res.status(400).json({ message: "Email not found" });
        }
      }
    });
  },
  sendOtp(req, res) {
    return __async(this, null, function* () {
      const { email } = req.body;
      try {
        const user = yield UserModel.findOne({ email });
        const sixDigitOTP = Math.floor(1e5 + Math.random() * 9e5).toString();
        var mailOptions = {
          from: "gadgetease.info@gmail.com",
          to: email,
          subject: "OTP for changing password",
          text: `Your OTP for changing password is ${sixDigitOTP}`
        };
        nodemailer_default.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
            console.log("otp ", sixDigitOTP);
          }
        });
        if (user) {
          user.otp = sixDigitOTP;
          yield user.save();
        }
      } catch (error) {
        console.error(error);
      }
    });
  },
  submitOtp(req, res) {
    return __async(this, null, function* () {
      const { otp, email } = req.body;
      try {
        const user = yield UserModel.findOne({ email, otp });
        if (!user) {
          return res.status(404).json({ message: "no user found" });
        }
        if (otp === (user == null ? void 0 : user.otp)) {
          res.status(200).json({ message: "OTP Verification Successfull" });
        } else {
          res.status(401).json({ messge: "OTP missmatch" });
        }
      } catch (error) {
        console.error(error);
      }
    });
  },
  changePassword(req, res) {
    return __async(this, null, function* () {
      const { otp, email, password } = req.body;
      try {
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = yield UserModel.findOne({ email, otp });
        if (!user) {
          return;
        }
        if (otp === user.otp) {
          user.password = hashedPassword;
          yield user.save();
          res.status(200).json({ message: "password changed successfully" });
        } else {
          res.redirect("http://localhost:3000/userhome");
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
};
var authController_default = authController;

// src/routes/authRoutes.ts
var router = express.Router();
router.post("/user/signup", authController_default.signup);
router.post("/user/login", authController_default.login);
router.post("/user/sendotp", authController_default.sendOtp);
router.post("/user/submitotp", authController_default.submitOtp);
router.post("/user/submitpassword", authController_default.changePassword);
var authRoutes_default = router;

// src/routes/userRoutes.ts
import express2 from "express";

// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import dotenv3 from "dotenv";
dotenv3.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
var cloudinary_default = cloudinary;

// src/controller/userController.ts
import jwt2 from "jsonwebtoken";

// src/events/publisher/userPublisher.ts
var userPublisher = {
  userUpdatedEvent(updatedUserData) {
    return __async(this, null, function* () {
      try {
        channel.sendToQueue("USER", Buffer.from(JSON.stringify(updatedUserData)));
        yield channel.close();
        yield connection.close();
      } catch (error) {
        console.error("Error publishing user update  event:", error);
      }
    });
  }
};
var userPublisher_default = userPublisher;

// src/events/consumer/userGigConsumer.ts
var userGigConsumers = {
  gigCreatedConsumer() {
    return __async(this, null, function* () {
      try {
        channel.consume("GIG", (data) => {
          if (data) {
            console.log("Data received : ", `${Buffer.from(data.content)}`);
            channel.ack(data);
            return JSON.parse(data.content.toString());
          }
        });
      } catch (err) {
        console.error("error setting up consumer", err);
      }
    });
  },
  gigStatusConsumer() {
    return __async(this, null, function* () {
      try {
        channel.consume("GIG", (data) => {
          if (data) {
            console.log("Data received : ", `${Buffer.from(data.content)}`);
            channel.ack(data);
            return JSON.parse(data.content.toString());
          }
        });
      } catch (err) {
        console.error("error setting up consumer", err);
      }
    });
  },
  gigDeleteConsumer() {
    return __async(this, null, function* () {
      try {
        channel.consume("GIG", (data) => {
          if (data) {
            console.log("Data received : ", `${Buffer.from(data.content)}`);
            channel.ack(data);
            return JSON.parse(data.content.toString());
          }
        });
      } catch (err) {
        console.error("error setting up consumer", err);
      }
    });
  },
  gigAcceptConsumer() {
    return __async(this, null, function* () {
      try {
        channel.consume("GIG", (data) => {
          if (data) {
            console.log("Data received : ", `${Buffer.from(data.content)}`);
            channel.ack(data);
            return JSON.parse(data.content.toString());
          }
        });
      } catch (err) {
        console.error("error setting up consumer", err);
      }
    });
  },
  gigRejectConsumer() {
    return __async(this, null, function* () {
      try {
        channel.consume("GIG", (data) => {
          if (data) {
            console.log("Data received : ", `${Buffer.from(data.content)}`);
            channel.ack(data);
            return JSON.parse(data.content.toString());
          }
        });
      } catch (err) {
        console.error("error setting up consumer", err);
      }
    });
  }
};
var userGigConsumer_default = userGigConsumers;

// src/models/GigUser.ts
import { Schema as Schema2, model as model2 } from "mongoose";
var skillSchema2 = new Schema2({
  value: String,
  label: String
});
var GigUserSchema = new Schema2({
  userId: {
    type: String
  },
  refId: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  description: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: "https://res.cloudinary.com/dihrwghx2/image/upload/v1699291554/admin-user-react/default-pic_rkk3gl.jpg"
  },
  status: {
    type: Boolean,
    default: false
  },
  ordersRecieved: {
    type: Schema2.Types.ObjectId
  },
  skills: {
    type: [skillSchema2],
    default: []
  },
  availability: {
    type: Boolean
  },
  portfolio: {
    type: Schema2.Types.ObjectId,
    ref: "Portfolio"
  },
  title: {
    type: String
  },
  gigdescription: {
    type: String
  },
  gigstatus: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number
  },
  tags: {
    type: String
  },
  image1: {
    type: String
  },
  image2: {
    type: String
  },
  image3: {
    type: String
  },
  video: {
    type: String,
    default: ""
  }
});
var GigUserModel = model2("GigUser", GigUserSchema);

// src/controller/userController.ts
import dotenv4 from "dotenv";

// src/events/publisher/orderPublisher.ts
var orderPublisher = (data) => __async(void 0, null, function* () {
  try {
    channel.sendToQueue("ORDER", Buffer.from(JSON.stringify(data)));
    yield channel.close();
    yield connection.close();
  } catch (error) {
    console.error(error);
  }
});

// src/controller/userController.ts
dotenv4.config();
var jwtSecret2 = process.env.JWT_KEY || "defaultSecret";
var userController = {
  setup() {
    return __async(this, null, function* () {
      try {
        const data = yield userGigConsumer_default.gigCreatedConsumer();
        console.log("[User Controller]: Data received:", data);
        const userId = data.userId;
        const user = yield UserModel.findById(userId);
        if (user && data) {
          const gigUserData = {
            userId,
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
          };
          const newGigUser = new GigUserModel(gigUserData);
          const savedGigUser = yield newGigUser.save();
          console.log("gigAdded success", savedGigUser);
        } else {
          console.log("no user and data");
        }
        console.log("[User Controller]: RabbitMQ setup completed");
      } catch (error) {
        console.error("[User Controller]: Error setting up RabbitMQ:", error);
      }
    });
  },
  gigStatusEvent() {
    return __async(this, null, function* () {
      try {
        const data = yield userGigConsumer_default.gigStatusConsumer();
        console.log("lslslslls", data);
        const gigId = data.objectId;
        const statusData = {
          status: data.status
        };
        const objId = yield GigUserModel.find({ refId: gigId });
        const gig = yield GigUserModel.findByIdAndUpdate(objId[0]._id, statusData, { new: true });
      } catch (error) {
        console.log(error);
      }
    });
  },
  gigDeleteEvent() {
    return __async(this, null, function* () {
      try {
        const data = yield userGigConsumer_default.gigDeleteConsumer();
        const gigId = data;
        const objId = yield GigUserModel.find({ refId: gigId });
        const gig = yield GigUserModel.findByIdAndDelete(objId[0]._id);
        console.log("gig deleted from usergig database");
      } catch (error) {
        console.log(error);
      }
    });
  },
  getUserHome(req, res) {
    return __async(this, null, function* () {
      const user = req.user;
      const userId = user == null ? void 0 : user.userId;
      const userData = yield UserModel.findById(userId);
      res.status(200).send(userData);
    });
  },
  userProfileUpdate(req, res) {
    return __async(this, null, function* () {
      var _a;
      try {
        const folderName = "skillVibe";
        const updatedData = req.body;
        console.log(req.body);
        const token = (_a = req.headers.authorization) == null ? void 0 : _a.split(" ")[1];
        if (!token) {
          res.status(401).json({ error: "Unauthorized - Token not provided" });
          return;
        }
        let decodedToken;
        try {
          decodedToken = jwt2.verify(token, jwtSecret2);
        } catch (jwtError) {
          console.error("JWT Verification Error:", jwtError);
          res.status(401).json({ error: "Unauthorized - Invalid token" });
          return;
        }
        const userId = decodedToken.userId;
        if (req.file) {
          const result = yield cloudinary_default.uploader.upload(req.file.path, { public_id: `${folderName}/${req.file.originalname}` });
          updatedData.profilePicture = result.secure_url;
        }
        console.log("updated data: ", updatedData);
        const user = yield UserModel.findByIdAndUpdate(userId, updatedData, { new: true });
        console.log("user", user);
        userPublisher_default.userUpdatedEvent(updatedData);
        userMessagePublisher_default.userUpdateMessageEvent(updatedData);
        res.status(200).json({ message: "User profile updated successfully", user });
      } catch (error) {
        console.log("Error handling user profile update:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  },
  getAllUsers(req, res) {
    return __async(this, null, function* () {
      try {
        const PAGE_SIZE = 10;
        const page = parseInt(req.query.page || "0", 10);
        const total = yield UserModel.countDocuments({});
        const allusers = yield UserModel.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
        res.status(200).json({ message: "user data fetched successfully", allusers, totalPages: Math.ceil(total / PAGE_SIZE) });
      } catch (error) {
        console.log("Error handling user profile update:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  },
  getAllGigs(req, res) {
    return __async(this, null, function* () {
      try {
        const PAGE_SIZE = 10;
        const page = parseInt(req.query.page || "0", 10);
        const total = yield GigUserModel.countDocuments({});
        const allgigs = yield GigUserModel.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
        res.status(200).json({ message: "gig data fetched successfully", allgigs, totalPages: Math.ceil(total / PAGE_SIZE) });
      } catch (error) {
        res.status(500).json({ error: "internal server error" });
      }
    });
  },
  mygigs(req, res) {
    return __async(this, null, function* () {
      var _a;
      try {
        const token = (_a = req.headers.authorization) == null ? void 0 : _a.split(" ")[1];
        if (!token) {
          return res.status(401).json({ error: "unauthorized" });
        }
        const decoded = jwt2.verify(token, jwtSecret2);
        const userId = decoded.userId;
        const usergigs = yield GigUserModel.find({ userId });
        res.status(200).json({ message: "success", usergigs });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
      }
    });
  },
  getgig(req, res) {
    return __async(this, null, function* () {
      try {
        const gigId = req.params.gigId;
        const gigData = yield GigUserModel.find({ refId: gigId });
        res.status(200).json(gigData);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
      }
    });
  },
  getallgig(req, res) {
    return __async(this, null, function* () {
      var _a;
      try {
        const token = (_a = req.headers.authorization) == null ? void 0 : _a.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "unauthorized access no token" });
        }
        const decodedToken = jwt2.verify(token, jwtSecret2);
        const userId = decodedToken.userId;
        const allgigs = yield GigUserModel.find({ userId: { $ne: userId }, status: true });
        return res.status(200).json({ message: "fetched Successfully", allgigs });
      } catch (err) {
        console.log(err);
      }
    });
  },
  viewgig(req, res) {
    return __async(this, null, function* () {
      try {
        const gigId = req.params.id;
        const gig = yield GigUserModel.find({ refId: gigId });
        return res.status(200).json({ message: "success", gig });
      } catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
      }
    });
  },
  orderGig(req, res) {
    return __async(this, null, function* () {
      var _a;
      try {
        const token = (_a = req.headers.authorization) == null ? void 0 : _a.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "Unauthorized access, no token" });
        }
        const decodedToken = jwt2.verify(token, jwtSecret2);
        const buyerId = decodedToken.userId;
        const buyer = yield UserModel.findById(buyerId);
        const gigId = req.params.id;
        const gig = yield GigUserModel.findOne({ refId: gigId });
        if (!gig) {
          return res.status(404).json({ message: "Gig not found" });
        }
        const orderDetails = __spreadProps(__spreadValues({}, gig.toObject()), {
          buyerId,
          buyername: buyer == null ? void 0 : buyer.username,
          buyeremail: buyer == null ? void 0 : buyer.email,
          buyerphone: buyer == null ? void 0 : buyer.phone,
          buyerProfile: buyer == null ? void 0 : buyer.profilePicture
        });
        orderPublisher(orderDetails);
        return res.status(200).json({ orderDetails });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });
  },
  viewgigdetail(req, res) {
    return __async(this, null, function* () {
      try {
        const gigId = req.params.gigId;
        const gig = yield GigUserModel.find({ refId: gigId });
        return res.status(200).json({ message: "Success", gig });
      } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Internal error" });
      }
    });
  },
  gigAccept() {
    return __async(this, null, function* () {
      const gigId = yield userGigConsumer_default.gigAcceptConsumer();
      console.log("recieved gig id", gigId);
      const gig = yield GigUserModel.findOneAndUpdate({ refId: gigId }, { gigstatus: true }, { new: true });
      console.log("accept status updated success", gig);
    });
  },
  gigReject() {
    return __async(this, null, function* () {
      const gigId = yield userGigConsumer_default.gigAcceptConsumer();
      console.log("recieved gig id", gigId);
      const gig = yield GigUserModel.findOneAndUpdate({ refId: gigId }, { gigstatus: false }, { new: true });
      console.log("accept status updated success", gig);
    });
  },
  userBlock(req, res) {
    return __async(this, null, function* () {
      const { userId } = req.body;
      try {
        console.log(userId);
        const user = yield UserModel.findByIdAndUpdate(userId, { status: false });
        return res.status(200).json({ message: "user blocked" });
      } catch (error) {
        console.error(error);
      }
    });
  },
  userUnblock(req, res) {
    return __async(this, null, function* () {
      const { userId } = req.body;
      try {
        console.log(userId);
        const user = yield UserModel.findByIdAndUpdate(userId, { status: true });
        return res.status(200).json({ message: "user un blocked" });
      } catch (error) {
        console.error(error);
      }
    });
  },
  searchgig(req, res) {
    return __async(this, null, function* () {
      var _a;
      const token = (_a = req.headers.authorization) == null ? void 0 : _a.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Unauthorized - Token not provided" });
      }
      let decodedToken;
      try {
        decodedToken = jwt2.verify(token, jwtSecret2);
      } catch (jwtError) {
        console.log("JWT Verification Error:", jwtError);
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      }
      try {
        const sort = req.query.sort;
        const filterPrice = req.query.price || 500;
        const keyword = req.params.searchId ? {
          $or: [
            { username: { $regex: req.params.searchId, $options: "i" } },
            { title: { $regex: req.params.searchId, $options: "i" } }
          ]
        } : {};
        let priceFilter = {};
        if (filterPrice) {
          priceFilter = { price: { $lt: filterPrice } };
        }
        if (sort === "High to low") {
          const users = yield GigUserModel.find(keyword).find(__spreadValues({ _id: { $ne: decodedToken.userId } }, priceFilter)).sort({ price: -1 });
          res.status(200).json(users);
        } else if (sort === "Low to high") {
          const users = yield GigUserModel.find(keyword).find(__spreadValues({ _id: { $ne: decodedToken.userId } }, priceFilter)).sort({ price: 1 });
          res.status(200).json(users);
        } else {
          const users = yield GigUserModel.find(keyword).find(__spreadValues({ _id: { $ne: decodedToken.userId } }, priceFilter)).exec();
          res.status(200).json(users);
        }
      } catch (error) {
        res.status(501).json({ error: "Internal server error" });
        console.error(error);
      }
    });
  },
  userSpecficDetails(req, res) {
    return __async(this, null, function* () {
      const { userId } = req.body;
      try {
        const users = yield UserModel.findById(userId);
        res.status(200).json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  },
  viewGigDetail(req, res) {
    return __async(this, null, function* () {
      const { gigId } = req.body;
      try {
        const gigData = yield GigUserModel.find({ refId: gigId });
        res.status(200).json(gigData);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error(error);
      }
    });
  }
};
var userController_default = userController;

// src/routes/userRoutes.ts
import verifyToken from "skill-vibe-express-jwt-auth";

// src/config/multer.ts
import multer from "multer";
import path from "path";
var multer_default = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(null, false);
      return;
    }
    cb(null, true);
  }
});

// src/routes/userRoutes.ts
var userRouter = express2.Router();
userRouter.get("/user/userhome", verifyToken, userController_default.getUserHome);
userRouter.get("/user/viewAllUsers", userController_default.getAllUsers);
userRouter.get("/user/viewallgigs", userController_default.getAllGigs);
userRouter.put("/user/userProfileUpdate", multer_default.single("uploadPic"), userController_default.userProfileUpdate);
userRouter.get("/user/mygigs", userController_default.mygigs);
userRouter.get("/user/editgig/:gigId", userController_default.getgig);
userRouter.get("/user/getallgig", userController_default.getallgig);
userRouter.get("/user/viewgig/:id", userController_default.viewgig);
userRouter.get("/user/ordergig/:id", userController_default.orderGig);
userRouter.get("/user/viewgigdetail/:gigId", userController_default.viewgigdetail);
userRouter.post("/user/block", userController_default.userBlock);
userRouter.post("/user/unblock", userController_default.userUnblock);
userRouter.get("/user/searchGig/:searchId", userController_default.searchgig);
userRouter.post("/user/userSpecficDetails", userController_default.userSpecficDetails);
userRouter.post("/user/viewGigDetail", userController_default.viewGigDetail);
var userRoutes_default = userRouter;

// src/app.ts
import cors from "cors";
var app = express3();
app.use(cors());
dotenv5.config();
app.use(express3.urlencoded({ extended: true }));
app.use(express3.json());
connectQueue();
userController_default.setup();
userController_default.gigAccept();
userController_default.gigReject();
userController_default.gigDeleteEvent();
app.use(authRoutes_default);
app.use(userRoutes_default);

// src/index.ts
import mongoose from "mongoose";
var mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  console.error("MongoDB connection URL is not defined.");
  process.exit(1);
}
mongoose.connect(mongoUrl).then(() => {
  console.log("database connected..");
}).catch((err) => {
  console.log("Database connection error", err);
});
app.listen(8001, () => {
  console.log(`server running on 8001`);
});
//# sourceMappingURL=index.mjs.map