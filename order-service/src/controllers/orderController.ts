import orderConsumer from '../events/consumer/orderconsumer';
import OrderModel from '../models/OrderModel';
import { Types } from 'mongoose';
import { Request, Response } from 'express';
import RazorpayInstance from '../config/razorPayConfig';
import dotenv from 'dotenv'


dotenv.config()

import crypto from 'crypto'
interface OrderData {
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

// const orderController = {
//     // async orderReceived() {
        
//     // },
//     // async paymentStatus(){
//     //     try {
//     //         const paymentData: any = await orderConsumer.paymentDetailsConsumer();
//     //         const orderId = paymentData.orderId
//     //         console.log(orderId);
            
        
//     //         const order = await OrderModel.findById(orderId);
        
//     //         if (!order) {
//     //           console.log('Order not found');
//     //           return;
//     //         }
        
//     //         order.set(paymentData);
//     //         const updatedOrder = await order.save();
        
//     //         console.log('Updated Order:', updatedOrder);
//     //       } catch (error) {
//     //         console.error('Error in paymentStatus:', error);
//     //       }
//     // },
//     async payment(req: Request, res: Response) {
//         try {
//             const { price, title } = req.body
//             const options = {
//                 amount: Number(price * 100),
//                 currency: "INR"
//             }
//             const order = await RazorpayInstance.orders.create(options)
//             res.status(200).json({message:"success", order})
            
//         } catch (error) {
//             res
//             console.log(error);
            
//         }

//     },
//     async paymentVerification(req: Request, res: Response) {
        
//         try {
//             const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//             const body = razorpay_order_id + "|" + razorpay_payment_id;
//             const expectedSignature = crypto.createHmac('sha256', process.env.PAYMENT_KEY_SECRET || '').update(body.toString()).digest('hex')
//             const isAuth = expectedSignature === razorpay_signature;
//                 if(isAuth){
//                     try {
//                         const orderdata = await orderConsumer.orderDetailsConsumer();
//                         const {
//                             userId,
//                             refId,
//                             username,
//                             phone,
//                             email,
//                             profilePicture,
//                             title,
//                             price,
//                             tags,
//                             buyerId,
//                             buyeremail,
//                             buyername,
//                             buyerphone,
//                             buyerProfile
//                         } = orderdata as OrderData;
//                         const order = new OrderModel({
//                             sellerId: userId,
//                             orderStatus: 'confirmed',
//                             paymentStatus: 'paid',
//                             gigId: refId,
//                             sellerName: username,
//                             sellerPhone: phone,
//                             sellerEmail: email,
//                             sellerPic: profilePicture,
//                             gigTitle: title,
//                             gigPrice: price,
//                             tags: tags,
//                             buyerId,
//                             buyername,
//                             buyeremail,
//                             buyerphone,
//                             buyerProfile
//                         });
//                         try {
//                             console.log(" saving...");
//                             await order.save();
//                             console.log('Order saved successfully');
//                         } catch (saveError) {
//                             console.error('Error saving order:', saveError);
//                         }
                        
//                     } catch (error) {
//                         console.error('Error in orderReceived:', error);
//                     }
//                     // paymentPublisher.orderEvent(paymentSuccesData)
                   
//                     res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
//             }else{
//                 try {
//                     const orderdata = await orderConsumer.orderDetailsConsumer();
//                     const {
//                         userId,
//                         refId,
//                         username,
//                         phone,
//                         email,
//                         profilePicture,
//                         title,
//                         price,
//                         tags,
//                         buyerId,
//                         buyeremail,
//                         buyername,
//                         buyerphone,
//                         buyerProfile
//                     } = orderdata as OrderData;
        
//                     const order = new OrderModel({
//                         sellerId: userId,
//                         orderStatus: 'failed',
//                         paymentStatus: 'failed',
//                         gigId: refId,
//                         sellerName: username,
//                         sellerPhone: phone,
//                         sellerEmail: email,
//                         sellerPic: profilePicture,
//                         gigTitle: title,
//                         gigPrice: price,
//                         tags: tags,
//                         buyerId,
//                         buyername,
//                         buyeremail,
//                         buyerphone,
//                         buyerProfile
//                     });
//                     try {
//                         console.log(" saving...");
//                         await order.save();
//                         console.log('Order saved successfully');
//                     } catch (saveError) {
//                         console.error('Error saving order:', saveError);
//                     }
                    
//                 } catch (error) {
//                     console.error('Error in orderReceived:', error);
//                 }

//                 // paymentPublisher.orderEvent(paymentFailedData)
//                 res.status(400).json({success:false});
//                }
//         } catch (error) {
//             console.log(error);

//         }
//     },
//     getKey(req: Request, res: Response){
//         console.log(process.env.PAYMENT_KEY_ID);
//         console.log('send');
//         return res.status(200).json({key:process.env.PAYMENT_KEY_ID})
        
//     }
// };


class OrderController {
    public orderdata: OrderData | unknown = null;



    public async fetchOrderData() {
        try {
            this.orderdata = await orderConsumer.orderDetailsConsumer();
            console.log("called");
            
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    }

    async payment(req: Request, res: Response) {
        try {
            const { price, title } = req.body;
            const options = {
                amount: Number(price * 100),
                currency: 'INR',
            };
            const order = await RazorpayInstance.orders.create(options);
            res.status(200).json({ message: 'success', order });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }

     async paymentVerification(req: Request, res: Response) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            const body = razorpay_order_id + '|' + razorpay_payment_id;
            const expectedSignature = crypto.createHmac('sha256', process.env.PAYMENT_KEY_SECRET || '').update(body.toString()).digest('hex');
            const isAuth = expectedSignature === razorpay_signature;
            if (isAuth) {
                try {
                    const {
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
                        buyerProfile,
                    } = this.orderdata as OrderData;

                    const order = new OrderModel({
                        sellerId: userId,
                        orderStatus: 'confirmed',
                        paymentStatus: 'paid',
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
                        buyerProfile,
                    });

                    try {
                        console.log('Saving order...');
                        await order.save();
                        console.log('Order saved successfully');
                    } catch (saveError) {
                        console.error('Error saving order:', saveError);
                    }
                } catch (error) {
                    console.error('Error in orderReceived:', error);
                }

                res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
            } else {
                try {
                    const {
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
                        buyerProfile,
                    } = this.orderdata as OrderData;

                    const order = new OrderModel({
                        sellerId: userId,
                        orderStatus: 'failed',
                        paymentStatus: 'failed',
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
                        buyerProfile,
                    });

                    try {
                        console.log('Saving order...');
                        await order.save();
                        console.log('Order saved successfully');
                    } catch (saveError) {
                        console.error('Error saving order:', saveError);
                    }
                } catch (error) {
                    console.error('Error in orderReceived:', error);
                }

                res.status(400).json({ success: false });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }

     getKey(req: Request, res: Response) {
        console.log(process.env.PAYMENT_KEY_ID);
        console.log('Sending key...');
        return res.status(200).json({ key: process.env.PAYMENT_KEY_ID });
    }
}

export default OrderController