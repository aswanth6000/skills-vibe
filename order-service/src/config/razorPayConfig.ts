import dotenv from 'dotenv'
dotenv.config()
import Razorpay from 'razorpay'

const RazorpayInstance = new Razorpay({
    key_id: process.env.PAYMENT_KEY_ID || '',
    key_secret: process.env.PAYMENT_KEY_SECRET
})

export default RazorpayInstance