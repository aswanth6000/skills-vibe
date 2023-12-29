import { Schema, model, Document } from "mongoose";

interface Payment extends Document {
    orderId: string;
    sellerId: string;
    gigId: string;
    userId: string;
    paymentId: string;
    paymentStatus: string;
    PaymentTime: string;
    amount: number;
}

const paymentSchema = new Schema<Payment>({
    orderId: { type: String, required: true },
    amount: {type: Number, required: true},
    sellerId: { type: String, required: true },
    gigId: { type: String, required: true },
    userId: { type: String, required: true },
    paymentId: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    PaymentTime: { type: String, required: true },
});

const PaymentModel = model<Payment>('Payment', paymentSchema);

export default PaymentModel;
