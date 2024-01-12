import { Schema, model, Types, ObjectId } from "mongoose";

interface User {
    _id: Types.ObjectId,
    userId: Types.ObjectId;
    username: string;
    phone: number;
    email: string;
    password: string;
    profilePicture: string;
    role: boolean;
    ordersRecieved: Types.ObjectId
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    clients: Types.ObjectId[];
    skills: any;
    availability: boolean;
    portfolio: Types.ObjectId;
    orders: Types.ObjectId;
    description: string
    otp: string | undefined
}


const skillSchema = new Schema({
  value: String,
  label: String,
});

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId
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

});

const UserModel = model<User>("User", userSchema);

export { User, UserModel };
