import express from 'express';
import paymentController from '../controllers/paymentController'
const paymentRouter = express.Router();

paymentRouter.post('/payment/:id',paymentController.payment)
paymentRouter.post('/paymentverification', paymentController.paymentVerification)
paymentRouter.get('/getkey', paymentController.getKey)

export default paymentRouter;