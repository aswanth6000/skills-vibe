import { Schema, model, Document } from "mongoose";

interface Payment extends Document {
    orderId: string;
    sellerId: string;
    gigId: string;
    userId: string;
    paymentId: string;
    paymentStatus: string;
    PaymentTime: Date;
    amount: number;
    orderStatus: string;
    sellerName: string;
    sellerPhone: string;
    sellerEmail: string;
    sellerPic: string;
    gigTitle: string;
    gigPrice: number;
    tags: string[];
    buyerId: string;
    buyername: string;
    buyeremail: string;
    buyerphone: string;
    buyerProfile: string;
}

const paymentSchema = new Schema<Payment>({
    orderId: { type: String, required: true },
    sellerId: { type: String, required: true },
    gigId: { type: String, required: true },
    paymentId: { type: String },
    paymentStatus: { type: String, required: true },
    PaymentTime: { type: Date,default: Date.now(), required: true },
    orderStatus: { type: String, required: true },
    sellerName: { type: String, required: true },
    sellerPhone: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    sellerPic: { type: String, required: true },
    gigTitle: { type: String, required: true },
    gigPrice: { type: Number, required: true },
    tags: { type: [String], required: true },
    buyerId: { type: String, required: true },
    buyername: { type: String, required: true },
    buyeremail: { type: String, required: true },
    buyerphone: { type: String, required: true },
    buyerProfile: { type: String, required: true },
});

const PaymentModel = model<Payment>('Payment', paymentSchema);

export default PaymentModel;

