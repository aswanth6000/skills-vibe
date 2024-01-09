import { Schema, model, Types, ObjectId } from "mongoose";
import { User } from "../types/usertypes";


const skillSchema = new Schema({
  value: String,
  label: String,
});

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  phone: {
    type: Number,
  },
  description: {
    type: String
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  profilePicture: {
    type: String,
    default: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1699291554/admin-user-react/default-pic_rkk3gl.jpg'
  },
  role: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true
  },
  clients: [{
    type: Types.ObjectId,
    ref: "User", // Assuming 'User' is the name of the model
  }],
  skills: {
    type: [skillSchema], // Expecting an array of skillSchema objects
    default: [],
  },
  availability: {
    type: Boolean,
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: "Portfolio", // Assuming 'Portfolio' is the name of the model
  },
  orders: {
    type: Schema.Types.ObjectId,
  },
  ordersRecieved: {
    type: Schema.Types.ObjectId,
  },
});

const UserModel = model<User>("User", userSchema);

export { User, UserModel };
