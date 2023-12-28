import { Schema, model, Types, ObjectId } from "mongoose";

interface Order{
    paymentId: string,
    userId: string,
    sellerId: string,
    price: number,
    gigId: string,
    date: string

}

const orderSchema = new Schema({
    paymentId: {
        type: String,
        
    },
    userId: {
        type: String,
        required: true,
    },
    sellerId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    gigId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
})