import orderConsumer from '../events/consumer/orderconsumer';
import OrderModel from '../models/OrderModel';
import { Types } from 'mongoose';
import { Request, Response } from 'express';
import RazorpayInstance from '../config/razorPayConfig';
import dotenv from 'dotenv'
import jwt, { JwtPayload, Secret, GetPublicKeyOrSecret } from 'jsonwebtoken'
dotenv.config()
import crypto from 'crypto'
import {v4 as uuidv4} from 'uuid'
import transporter from '../config/nodeMailer';
const jwtSecret: Secret | GetPublicKeyOrSecret = process.env.JWT_KEY || 'defaultkey'

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

var orderdata: OrderData | any
const orderController = {

    async fetchOrderData(): Promise<OrderData | unknown> {
        try {
            orderdata = await orderConsumer.orderDetailsConsumer();
            return orderdata;
        } catch (error) {
            console.error('Error fetching order data:', error);
            return null;
        }
    },

    async payment(req: Request, res: Response): Promise<void> {
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
    },

    async paymentVerification(req: Request, res: Response): Promise<void> {
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
                    } = orderdata;

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
                    } = orderdata;

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
    },

    getKey(req: Request, res: Response): void {
        console.log(process.env.PAYMENT_KEY_ID);
        res.status(200).json({ key: process.env.PAYMENT_KEY_ID });
    },
    async myorders(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: "Unauthorized acces, No token provided" });
            }
            const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
            const userId = decodedToken.userId;
            const order = await OrderModel.find({ buyerId: userId });
            return res.status(200).json(order);
        } catch (error) {
            console.error(error);
            return res.status(501).json({ message: "Internal server error"})

        }
    },
    async orders(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: "Unauthorized acces, No token provided" });
            }
            const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
            const userId = decodedToken.userId;
            const order = await OrderModel.find({ sellerId: userId });
            return res.status(200).json(order);
        } catch (error) {
            console.error(error);
            return res.status(501).json({ message: "Internal server error"})

        }
    },
    async viewOrders(req: Request, res: Response){
        try {
            const orders = await OrderModel.find()
            res.status(200).json({message: 'success', orders})
        } catch (error) {
            console.error(error);
            res.status(501).json({message: 'internal server error'})
        }
    },
    async orderCancel(req: Request, res: Response){
        const {orderId} = req.body;
        console.log(orderId);
        try {
            const order = await OrderModel.findByIdAndUpdate(orderId, {orderStatus: 'cancelled', paymentStatus: 'refund initiated'}, {new:true})
            res.status(200).json({message: 'order cancelled', order})
        } catch (error) {
            console.error(error);
            res.status(501).json({message: 'Internal server error'})
        }
    },
    async orderAccept(req: Request, res: Response){
        const {orderId, status} = req.body;
        try {
            const order = await OrderModel.findByIdAndUpdate(orderId, {orderStatus: 'ongoing'} ,{new: true})
            res.status(200).json({message: 'successfully send'})
        } catch (error) {
            console.error(error);
        }
    },
    async orderReject(req: Request, res: Response){
        const {orderId, status} = req.body;
        try {
            const order = await OrderModel.findByIdAndUpdate(orderId, {orderStatus: 'rejected by seller' }, {new: true});
            res.status(200).json({message: 'success'})
        } catch (error) {
            console.error(error);
            res.status(501).json({message: "Internal server error"})
            
        }
    },
    async vorders(req: Request, res: Response){
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
              res.status(401).json({ error: 'Unauthorized - Token not provided' });
              return;
            }
            let decodedToken: JwtPayload;
            try {
              decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
            } catch (jwtError) {
              console.error('JWT Verification Error:', jwtError);
              res.status(401).json({ error: 'Unauthorized - Invalid token' });
              return;
            }
            const userId = decodedToken.userId
            const orders = await OrderModel.find({buyerId: userId});
            return res.status(200).json({message: "success", orders})
        } catch (error) {
            console.error(error);
            
        }
    },
    async deliver(req: Request, res: Response){
        const file = req.file;
        const {orderId} = req.body;
        const order = await OrderModel.findById(orderId);        
        const mailOptions = {
            from: order?.sellerEmail,
            to: order?.buyeremail ,
            subject: `Delivery of your order ${order?.gigTitle}` ,
            text: 'Thank for your order at skills vibe',
            attachments: [
                {
                    filename: file?.originalname ,
                    content: file?.buffer ,
                },
            ],
        };
        const odr = await OrderModel.findByIdAndUpdate(orderId, {orderStatus: 'completed'}, {new: true});

        
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Email sent successfully' });
          } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Internal server error' });
          }
    },
    async orderReview(req: Request, res: Response){
        try {
            const {orderId} = req.body;
            const order = await OrderModel.findByIdAndUpdate(orderId, {orderStatus: 'review'}, {new: true})
            return res.status(200).json({message: 'Order status not accepted'})
        } catch (error) {
            console.error(error)
            res.status(501).json({message: 'Internal server error'})
        }
    },
    async earnings(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
          return res.status(401).json({ error: 'Unauthorized - Token not provided' });
        }
      
        let decodedToken: JwtPayload;
      
        try {
          decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
        } catch (jwtError) {
          console.log('JWT Verification Error:', jwtError);
          return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
      
        try {
          const result = await OrderModel.aggregate([
            {
              $match: {
                sellerId: decodedToken.userId,
                orderStatus: 'completed'
              }
            },
            {
              $group: {
                _id: '$sellerId',
                totalPrice: { $sum: '$gigPrice' }
              }
            }
          ]);      
          res.status(200).json(result);
        } catch (error) {
          console.error('Error in aggregation:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
      async viewOrderDetail(req: Request, res: Response){
        const {orderId} = req.body
        try {
            const order = await OrderModel.findById(orderId);
            res.status(200).json(order)
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "internal server error", error})
        }
        
      },
      async withdraw(req: Request, res: Response){
        const {orderId, paymentStatus} = req.body
        console.log(req.body);
        
        try {
            const order = await OrderModel.findByIdAndUpdate(orderId, {paymentStatus}, {new: true})
            res.status(200).json(order)
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "internal server error"})
        }
      }
}

export default orderController;