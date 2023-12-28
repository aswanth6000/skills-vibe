import { Types, ObjectId } from "mongoose";
import { Request, Response } from "express";

export  interface ParsedQs {
    [key: string]: string | undefined;
  }

  export interface ExtendedRequest extends Request {
    user?: {
      userId: string;
    };
  }

  export interface UserLoggedInEvent {
    userId: string;
    timestamp: Date;
  }

  export interface GigUser { 
    _id: Types.ObjectId,
    userId: string,
    username: string;
    phone: number;
    email: string;
    password: string;
    profilePicture: string;
    ordersRecieved: Types.ObjectId
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
  export interface User {
    _id: Types.ObjectId,
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
  }

  