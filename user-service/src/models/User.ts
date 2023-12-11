import { Schema, model, Types } from "mongoose";

interface User {
  username: string;
  phone: number;
  email: string;
  password: string;
  profilePicture: string;
  role: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  clients: Types.ObjectId[];
  skills: string[];
  availability: boolean;
  portfolio: Types.ObjectId;
  orders: Types.ObjectId;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
    required: true,
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
    required: true,
  },
  clients: [{
    type: Types.ObjectId,
    ref: "User", // Assuming 'User' is the name of the model
  }],
  skills: [{
    type: String,
  }],
  availability: {
    type: Boolean,
    required: true,
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: "Portfolio", // Assuming 'Portfolio' is the name of the model
  },
  orders: {
    type: Schema.Types.ObjectId,
    ref: "Order", // Assuming 'Order' is the name of the model
  },
});

const UserModel = model<User>("User", userSchema);

export { User, UserModel };
