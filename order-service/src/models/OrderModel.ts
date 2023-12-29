import { Schema, model, Document } from 'mongoose';

interface Order extends Document {
    paymentId: string;
    sellerId: string;
    gigPrice: number;
    gigId: string;
    date: Date;
    orderStatus: string;
    paymentStatus: string;
    sellerName: string;
    sellerPhone: number;
    sellerEmail: string;
    sellerPic: string;
    gigTitle: string;
    tags: string[];
    buyerId: string;
    buyername: string;
    buyeremail: string;
    buyerphone: string;
    buyerProfile: string;
}

const orderSchema = new Schema<Order>({
    paymentId: {
        type: String,
    },
    sellerId: {
        type: String,
        required: true,
    },
    gigId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    orderStatus: {
        type: String,
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        default: 'pending',
    },
    sellerName: {
        type: String,
        required: true,
    },
    sellerPhone: {
        type: Number,
        required: true,
    },
    sellerEmail: {
        type: String,
        required: true,
    },
    sellerPic: {
        type: String,
        required: true,
    },
    gigTitle: {
        type: String,
        required: true,
    },
    gigPrice: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    buyername: {
        type: String,
        required: true,
    },
    buyeremail: {
        type: String,
        required: true,
    },
    buyerphone: {
        type: String,
        required: true,
    },
    buyerProfile: {
        type: String,
        required: true,
    },
});

const OrderModel = model<Order>('Order', orderSchema);

export default OrderModel;
