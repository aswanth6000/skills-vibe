"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/index.ts
var import_express3 = __toESM(require("express"));
var import_dotenv6 = __toESM(require("dotenv"));
var import_mongoose3 = __toESM(require("mongoose"));

// src/routes/authRoutes.ts
var import_express = __toESM(require("express"));

// src/models/User.ts
var import_mongoose = require("mongoose");
var skillSchema = new import_mongoose.Schema({
  value: String,
  label: String
});
var userSchema = new import_mongoose.Schema({
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
    type: import_mongoose.Types.ObjectId,
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
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "Portfolio"
    // Assuming 'Portfolio' is the name of the model
  },
  orders: {
    type: import_mongoose.Schema.Types.ObjectId
  },
  ordersRecieved: {
    type: import_mongoose.Schema.Types.ObjectId
  }
});
var UserModel = (0, import_mongoose.model)("User", userSchema);

// src/controller/authController.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv3 = __toESM(require("dotenv"));

// src/config/nodemailer.ts
var import_nodemailer = __toESM(require("nodemailer"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var EMAIL = process.env.EMAIL;
var EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
var transporter = import_nodemailer.default.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD
  }
});
var nodemailer_default = transporter;

// src/events/messages/rabbitMQ.ts
var amqp = __toESM(require("amqplib"));
var import_dotenv2 = __toESM(require("dotenv"));
import_dotenv2.default.config();
var rabbitURL = process.env.RABBIT_MQ;
var _RabbitMQ = class _RabbitMQ {
  static getConnection() {
    return __async(this, null, function* () {
      try {
        if (!_RabbitMQ.connection) {
          _RabbitMQ.connection = yield amqp.connect(rabbitURL);
        }
        return _RabbitMQ.connection;
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
  }
  static createChannel() {
    return __async(this, null, function* () {
      try {
        const connection = yield _RabbitMQ.getConnection();
        return connection.createChannel();
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
  }
};
_RabbitMQ.connection = null;
var RabbitMQ = _RabbitMQ;
var rabbitMQ_default = RabbitMQ;

// src/events/publisher/userMessagePublisher.ts
var userMessagePublisher = {
  userMessageEvent(updatedUserData) {
    return __async(this, null, function* () {
      try {
        console.log("Starting User MessageRabbitMQ producer...");
        const channel = yield rabbitMQ_default.createChannel();
        const exchangeName = "user-message-exchange";
        const routingKey = "user-message-created";
        yield channel.assertExchange(exchangeName, "direct", { durable: false });
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(updatedUserData)));
        yield channel.close();
      } catch (error) {
        console.error("Error publishing user messagee event:", error);
      }
    });
  },
  userUpdateMessageEvent(updatedUserData) {
    return __async(this, null, function* () {
      try {
        console.log("Starting User update MessageRabbitMQ producer...");
        const channel = yield rabbitMQ_default.createChannel();
        const exchangeName = "user-update-message-exchange";
        const routingKey = "user-update-message-created";
        yield channel.assertExchange(exchangeName, "direct", { durable: false });
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(updatedUserData)));
        yield channel.close();
      } catch (error) {
        console.error("Error publishing user update messagee event:", error);
      }
    });
  }
};
var userMessagePublisher_default = userMessagePublisher;

// src/controller/authController.ts
import_dotenv3.default.config();
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
            const token = import_jsonwebtoken.default.sign({ userId: newUser._id }, jwtSecret, { expiresIn: "1h" });
            res.status(201).json({ user: newUser, token });
          } else {
            console.log("User already exists");
            res.status(200).json({ user, message: "User already exists." });
          }
        } else {
          const { email: email2, username: username2, password, phone } = req.body;
          const user = yield UserModel.findOne({ email: email2 });
          const hashedPassword = yield import_bcrypt.default.hash(password, 10);
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
            res.status(200).json({ message: "User already exists." });
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
            const token = import_jsonwebtoken.default.sign(payload, jwtSecret, { expiresIn: "1h" });
            return res.status(204).json({ token, admin: "admin data" });
          } else {
            const role = "user";
            const user = yield UserModel.findOne({ email }).exec();
            if (!user) {
              return res.status(203).json({ message: "User not found" });
            }
            if (!user.status) {
              return res.status(207).json({ message: "User is blocked by admin" });
            }
            const validPassword = yield import_bcrypt.default.compare(password, user.password);
            if (!validPassword) {
              return res.status(203).json({ message: "Invalid Password" });
            }
            const payload = {
              userId: user._id,
              email: user.email,
              username: user.username,
              status: user.status,
              role
            };
            const token = import_jsonwebtoken.default.sign(payload, jwtSecret, { expiresIn: "1h" });
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
          const token = import_jsonwebtoken.default.sign(payload, jwtSecret, { expiresIn: "1h" });
          res.cookie("jwt", token, { httpOnly: true });
          res.status(200).json({ token });
        } else {
          res.status(203).json({ message: "Email not found" });
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
        const hashedPassword = yield import_bcrypt.default.hash(password, 10);
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
var router = import_express.default.Router();
router.post("/user/signup", authController_default.signup);
router.post("/user/login", authController_default.login);
router.post("/user/sendotp", authController_default.sendOtp);
router.post("/user/submitotp", authController_default.submitOtp);
router.post("/user/submitpassword", authController_default.changePassword);
var authRoutes_default = router;

// src/routes/userRoutes.ts
var import_express2 = __toESM(require("express"));

// src/config/cloudinary.ts
var import_cloudinary = require("cloudinary");
var import_dotenv4 = __toESM(require("dotenv"));
import_dotenv4.default.config();
import_cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
var cloudinary_default = import_cloudinary.v2;

// src/controller/userController.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));

// src/events/publisher/userPublisher.ts
var userPublisher = {
  userUpdatedEvent(updatedUserData) {
    return __async(this, null, function* () {
      try {
        console.log("Starting RabbitMQ producer...");
        const channel = yield rabbitMQ_default.createChannel();
        const exchangeName = "user-exchange";
        const routingKey = "user-created";
        yield channel.assertExchange(exchangeName, "direct", { durable: false });
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(updatedUserData)));
        yield channel.close();
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
        console.log("starting rabbit mq channel ");
        const channel = yield rabbitMQ_default.createChannel();
        const exchangeName = "gig-exchange";
        const queueName = "gig-service-queue";
        yield channel.assertExchange(exchangeName, "direct", { durable: false });
        const { queue } = yield channel.assertQueue(queueName, { durable: false });
        const routingKey = "gig-created";
        yield channel.bindQueue(queue, exchangeName, routingKey);
        return new Promise((resolve, reject) => {
          channel.consume(queue, (message) => {
            if (message) {
              try {
                const createdGig = JSON.parse(message.content.toString());
                channel.ack(message);
                resolve(createdGig);
              } catch (error) {
                console.error("error processing gig creation");
                channel.ack(message);
                reject(error);
              }
            }
          });
        });
        yield channel.close();
      } catch (err) {
        console.error("error setting up consumer", err);
      }
    });
  },
  gigStatusConsumer() {
    return __async(this, null, function* () {
      try {
        console.log("starting rabbit mq channel ");
        const channel = yield rabbitMQ_default.createChannel();
        const exchangeName = "gig-exchange";
        const queueName = "gig-service-queue";
        yield channel.assertExchange(exchangeName, "direct", { durable: false });
        const { queue } = yield channel.assertQueue(queueName, { durable: false });
        const routingKey = "gig-status-created";
        yield channel.bindQueue(queue, exchangeName, routingKey);
        return new Promise((resolve, reject) => {
          channel.consume(queue, (message) => {
            if (message) {
              try {
                const createdGig = JSON.parse(message.content.toString());
                channel.ack(message);
                resolve(createdGig);
              } catch (error) {
                console.error("error processing gig creation");
                channel.ack(message);
                reject(error);
              }
            }
          });
        });
        yield channel.close();
      } catch (err) {
        console.error("error setting up consumer", err);
      }
    });
  },
  gigDeleteConsumer() {
    return __async(this, null, function* () {
      try {
        console.log("starting rabbit mq channel ");
        const channel = yield rabbitMQ_default.createChannel();
        const exchangeName = "gig-exchange";
        const queueName = "gig-delete-queue";
        yield channel.assertExchange(exchangeName, "direct", { durable: false });
        const { queue } = yield channel.assertQueue(queueName, { durable: false });
        const routingKey = "gig-delete-created";
        yield channel.bindQueue(queue, exchangeName, routingKey);
        return new Promise((resolve, reject) => {
          channel.consume(queue, (message) => {
            if (message) {
              try {
                const createdGig = JSON.parse(message.content.toString());
                channel.ack(message);
                resolve(createdGig);
              } catch (error) {
                console.error("error processing gig creation");
                channel.ack(message);
                reject(error);
              }
            }
          });
        });
        yield channel.close();
      } catch (err) {
        console.error("error setting up consumer", err);
      }
    });
  },
  gigAcceptConsumer() {
    return __async(this, null, function* () {
      try {
        console.log("starting rabbit mq channel ");
        const channel = yield rabbitMQ_default.createChannel();
        const exchangeName = "gig-exchange";
        const queueName = "gig-accept-queue";
        yield channel.assertExchange(exchangeName, "direct", { durable: false });
        const { queue } = yield channel.assertQueue(queueName, { durable: false });
        const routingKey = "gig-status-accept-created";
        yield channel.bindQueue(queue, exchangeName, routingKey);
        return new Promise((resolve, reject) => {
          channel.consume(queue, (message) => {
            if (message) {
              try {
                const createdGig = JSON.parse(message.content.toString());
                channel.ack(message);
                resolve(createdGig);
              } catch (error) {
                console.error("error processing gig creation");
                channel.ack(message);
                reject(error);
              }
            }
          });
        });
        yield channel.close();
      } catch (err) {
        console.error("error setting up consumer", err);
      }
    });
  },
  gigRejectConsumer() {
    return __async(this, null, function* () {
      try {
        console.log("starting rabbit mq channel ");
        const channel = yield rabbitMQ_default.createChannel();
        const exchangeName = "gig-exchange";
        const queueName = "gig-reject-queue";
        yield channel.assertExchange(exchangeName, "direct", { durable: false });
        const { queue } = yield channel.assertQueue(queueName, { durable: false });
        const routingKey = "gig-status-reject-created";
        yield channel.bindQueue(queue, exchangeName, routingKey);
        return new Promise((resolve, reject) => {
          channel.consume(queue, (message) => {
            if (message) {
              try {
                const createdGig = JSON.parse(message.content.toString());
                channel.ack(message);
                resolve(createdGig);
              } catch (error) {
                console.error("error processing gig creation");
                channel.ack(message);
                reject(error);
              }
            }
          });
        });
        yield channel.close();
      } catch (err) {
        console.error("error setting up consumer", err);
      }
    });
  }
};
var userGigConsumer_default = userGigConsumers;

// src/models/GigUser.ts
var import_mongoose2 = require("mongoose");
var skillSchema2 = new import_mongoose2.Schema({
  value: String,
  label: String
});
var GigUserSchema = new import_mongoose2.Schema({
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
    type: import_mongoose2.Schema.Types.ObjectId
  },
  skills: {
    type: [skillSchema2],
    default: []
  },
  availability: {
    type: Boolean
  },
  portfolio: {
    type: import_mongoose2.Schema.Types.ObjectId,
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
var GigUserModel = (0, import_mongoose2.model)("GigUser", GigUserSchema);

// src/controller/userController.ts
var import_dotenv5 = __toESM(require("dotenv"));

// src/events/publisher/orderPublisher.ts
var orderPublisher = {
  orderEvent(orderDetails) {
    return __async(this, null, function* () {
      try {
        console.log("Starting RabbitMQ producer...");
        const channel = yield rabbitMQ_default.createChannel();
        const exchangeName = "order-exchange";
        const routingKey = "order-created";
        yield channel.assertExchange(exchangeName, "direct", { durable: false });
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(orderDetails)));
        yield channel.close();
        console.log("channel closed order");
      } catch (error) {
        console.log("error publishing order details event ");
      }
    });
  }
};
var orderPublisher_default = orderPublisher;

// src/controller/userController.ts
import_dotenv5.default.config();
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
          decodedToken = import_jsonwebtoken2.default.verify(token, jwtSecret2);
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
        const decoded = import_jsonwebtoken2.default.verify(token, jwtSecret2);
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
        const decodedToken = import_jsonwebtoken2.default.verify(token, jwtSecret2);
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
        const decodedToken = import_jsonwebtoken2.default.verify(token, jwtSecret2);
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
        orderPublisher_default.orderEvent(orderDetails);
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
        decodedToken = import_jsonwebtoken2.default.verify(token, jwtSecret2);
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
var import_skill_vibe_express_jwt_auth = __toESM(require("skill-vibe-express-jwt-auth"));

// src/config/multer.ts
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var multer_default = (0, import_multer.default)({
  storage: import_multer.default.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = import_path.default.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(null, false);
      return;
    }
    cb(null, true);
  }
});

// src/routes/userRoutes.ts
var userRouter = import_express2.default.Router();
userRouter.get("/user/userhome", import_skill_vibe_express_jwt_auth.default, userController_default.getUserHome);
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

// src/index.ts
var import_cors = __toESM(require("cors"));
var app = (0, import_express3.default)();
app.use((0, import_cors.default)());
import_dotenv6.default.config();
app.use(import_express3.default.urlencoded({ extended: true }));
app.use(import_express3.default.json());
var PORT = process.env.PORT || 8001;
userController_default.setup();
userController_default.gigAccept();
userController_default.gigReject();
userController_default.gigDeleteEvent();
app.use(authRoutes_default);
app.use(userRoutes_default);
var mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  console.error("MongoDB connection URL is not defined.");
  process.exit(1);
}
import_mongoose3.default.connect(mongoUrl).then(() => {
  console.log("database connected..");
}).catch((err) => {
  console.log("Database connection error", err);
});
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
//# sourceMappingURL=index.js.map