import { Schema, model, Types, ObjectId } from "mongoose";

interface GigUser { 
  _id: Types.ObjectId,
  userId: string,
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
  skills: any;
  availability: boolean;
  portfolio: Types.ObjectId;
  orders: Types.ObjectId;
  description: string
  title: string;
  gigdescription: string;
  price: number;
  tags: string;
  image1: string;
  image2: string;
  image3: string;
  video: string;
  refId: string;
}

const skillSchema = new Schema({
  value: String,
  label: String,
});

const GigUserSchema = new Schema<GigUser>({
  userId:{
    type: String,

  },
  refId: {
    type: String,
  },
  username: {
    type: String,
    required: true,
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
  profilePicture: {
    type: String,
    default: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1699291554/admin-user-react/default-pic_rkk3gl.jpg'
  },
  status: {
    type: Boolean,
    default: false
  },
  skills: {
    type: [skillSchema],
    default: [],
  },
  availability: {
    type: Boolean,
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: "Portfolio",
  },
  title: {
    type: String,
  },
  gigdescription: {
    type: String,
  },
  price: {
    type: Number,
  },
  tags: {
    type: String,
  },
  image1: {
    type: String,

  },
  image2: {
    type: String,

  },
  image3: {
    type: String,

  },
  video: {
    type: String,
    default: '',
  },
});

const GigUserModel = model<GigUser>("GigUser", GigUserSchema);

export { GigUser, GigUserModel };
