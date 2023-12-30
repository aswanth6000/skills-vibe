import paymentConsumer from '../events/consumer/consumer';
import PaymentModel from '../models/PaymentModel';
import razorpay from 'razorpay'
import RazorpayInstance from '../../../order-service/src/config/razorPayConfig';
import dotenv from 'dotenv'
import crypto from 'crypto'
import { Response, Request } from 'express';
import paymentPublisher from '../events/publisher/publisher';

dotenv.config()

interface OrderData {
    _id: string;
    userId: string;
    refId: string;
    username: string;
    phone: string;
    email: string;
    profilePicture: string;
    title: string;
    price: number;
    tags: string[];
    buyerId: string,
    buyeremail: string,
    buyername: string,
    buyerphone: number,
    buyerProfile: string
}

const paymentController = {
    async orderReceived() { 
        try {
          const orderdata = await paymentConsumer.orderDetailsConsumer()
                    const {
                        _id,
                        userId,
                        refId,
                        username,
                        phone,
                        email,
                        profilePicture,
                        title,
                        price,
                        tags,
                        buyerId,
                        buyeremail,
                        buyername,
                        buyerphone,
                        buyerProfile
                    } = orderdata as OrderData;
        
                    const order = new PaymentModel({
                        orderId: _id,
                        sellerId: userId,
                        orderStatus: 'pending',
                        paymentStatus: 'pending',
                        gigId: refId,
                        sellerName: username,
                        sellerPhone: phone,
                        sellerEmail: email,
                        sellerPic: profilePicture,
                        gigTitle: title,
                        gigPrice: price,
                        tags: tags,
                        buyerId,
                        buyername,
                        buyeremail,
                        buyerphone,
                        buyerProfile
                    });
                    console.log("lll",order);
                    
                    try {
                        console.log(" saving...");
                        await order.save();
                        console.log('Order saved successfully');
                    } catch (saveError) {
                        console.error('Error saving order:', saveError);
                    }

        } catch (error) {
            console.error('Error in orderReceived:', error);
        }
    },


}

export default paymentController;


// {
//     _id: '658c4856740484642ea26f8e',
//     userId: '6588fd15adc8314beb13bcde',
//     refId: '658c4855c0a8be84cf8fc515',
//     username: 'Aswanth6000',
//     phone: 7025552608,
//     email: 'aswanth682@gmail.com',
//     profilePicture: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1702699216/skillVibe/Date%20with%20santa%20song%20cover.jpg.jpg',
//     status: true,
//     skills: [],
//     title: 'nmnn',
//     gigdescription: 'kkk',
//     price: 44,
//     tags: 'hh',
//     image1: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1703692373/skillVibe/_81eaa63c-1b51-49e1-95a4-042b16995d59.jpg.jpg',
//     image2: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1703477502/skillVibe/_d531c00d-b1a6-4aae-b657-76e5887ec602.jpeg.jpg.jpg',
//     image3: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1703683434/skillVibe/_8120ff27-8ce3-4727-a04d-2dd1cc7a5e84.jpg.jpg',
//     video: '',
//     __v: 0,
//     buyerId: '658cfae3b4f3ade34364ec01',
//     buyername: 'Muhammed',
//     buyeremail: 'jauharp02@gmail.com',
//     buyerphone: 8746374893,
//     buyerProfile: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1699291554/admin-user-react/default-pic_rkk3gl.jpg'
//   }