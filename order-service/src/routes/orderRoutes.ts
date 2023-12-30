import express from 'express';
import orderController from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/payment/:id', orderController.payment);
orderRouter.post('/paymentverification', orderController.paymentVerification);
orderRouter.get('/getkey', orderController.getKey)


// paymentRouter.post('/payment/:id',paymentController.payment)
// paymentRouter.post('/paymentverification', paymentController.paymentVerification)
// paymentRouter.get('/getkey', paymentController.getKey)

export default orderRouter;