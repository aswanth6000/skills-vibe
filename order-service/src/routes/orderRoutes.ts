import express from 'express';
import orderController from '../controllers/orderController';

const orderRouter = express.Router();
const OrderController = new orderController();


orderRouter.post('/payment/:id',OrderController.payment );
orderRouter.post('/paymentverification',OrderController.paymentVerification);
orderRouter.get('/getkey',OrderController.getKey)


// paymentRouter.post('/payment/:id',paymentController.payment)
// paymentRouter.post('/paymentverification', paymentController.paymentVerification)
// paymentRouter.get('/getkey', paymentController.getKey)

export default orderRouter;