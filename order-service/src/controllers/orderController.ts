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
import { OrderData } from '../types/orderTypes';
const jwtSecret: Secret | GetPublicKeyOrSecret = process.env.JWT_KEY || 'defaultkey'




var orderdata: OrderData | any
const orderController = {
// @DESC function to fetch order data

    async fetchOrderData(): Promise<OrderData | unknown> {
        try {
            orderdata = await orderConsumer.orderDetailsConsumer();
            return orderdata;
        } catch (error) {
            console.error('Error fetching order data:', error);
            return null;
        }
    },
// @DESC user can complete payment of their order
// @METHOD  post
// @PATH /payment

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
// @DESC to verify the payment 
// @METHOD  post
// @PATH /paymentverification 
    async paymentVerification(req: Request, res: Response): Promise<void> {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            const body = razorpay_order_id + '|' + razorpay_payment_id;
            const expectedSignature = crypto.createHmac('sha256', process.env.PAYMENT_KEY_SECRET || '').update(body.toString()).digest('hex');
            const isAuth = expectedSignature === razorpay_signature;

            if (isAuth && orderdata) {
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

                res.redirect(`https://skills-vibe.vercel.app/paymentsuccess?reference=${razorpay_payment_id}`);
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
// @DESC generate the key id for the user
  // @METHOD  get
  // @PATH /getkey
    getKey(req: Request, res: Response): void {
        res.status(200).json({ key: process.env.PAYMENT_KEY_ID });
    },
// @DESC user can view their orders
// @METHOD  get
// @PATH /myorders
    async myorders(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: "Unauthorized acces, No token provided" });
            }
            const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
            const userId = decodedToken.userId;
            const order = await OrderModel.find({ buyerId: userId }).sort({date: -1});
            return res.status(200).json(order);
        } catch (error) {
            console.error(error);
            return res.status(501).json({ message: "Internal server error"})
        }
    },
// @DESC  user can view their order
// @METHOD  get
// @PATH /orders
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
// @DESC admin  can view the all orders
// @METHOD  get
// @PATH /vieworders
    async viewOrders(req: Request, res: Response){
        try {
            const PAGE_SIZE = 10
            const page: number = parseInt(req.query.page as string || '0', 10);            
            const total = await OrderModel.countDocuments({})
            const orders = await OrderModel.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page)
            res.status(200).json({message: 'success', orders, totalPages: Math.ceil(total / PAGE_SIZE)})
        } catch (error) {
            console.error(error);
            res.status(501).json({message: 'internal server error'})
        }
    },
// @DESC user can order their orders
// @METHOD  post
// @PATH /ordercancel
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
// @DESC seller cna accept the order
// @METHOD  post
// @PATH /orderaccept
    async orderAccept(req: Request, res: Response){
        const {orderId, status} = req.body;
        try {
            const order = await OrderModel.findByIdAndUpdate(orderId, {orderStatus: 'ongoing'} ,{new: true})
            res.status(200).json({message: 'successfully send'})
        } catch (error) {
            console.error(error);
        }
    },
// @DESC seller can reject the order
// @METHOD  post 
// @PATH /orderreject
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
// @DESC user route that will be redirectrd to the user homne after login 
// @METHOD  
// @PATH /vorders
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
// @DESC send the delivered product to the customer email
// @METHOD  post
// @PATH /dekuver
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
// @DESC user can review the order
// @METHOD  post
// @PATH /orderreview
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
// @DESC user can view their earnings
// @METHOD  get
// @PATH /earnings
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
                orderStatus: 'withdrawable'
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
// @DESC view the order details
// @METHOD  get
// @PATH /veieworderdetail
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
// @DESC seller can withdraw the money to his/her bank account
// @METHOD  post
// @PATH /withdraw
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