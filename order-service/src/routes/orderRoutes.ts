import express from 'express';
import orderController from '../controllers/orderController';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  // Create the multer instance
  const upload = multer({ storage: storage });

const orderRouter = express.Router();


orderRouter.post('/order/payment/:id',orderController.payment )
orderRouter.post('/order/paymentverification',orderController.paymentVerification);
orderRouter.get('/order/getkey',orderController.getKey)
orderRouter.get('/order/myorders', orderController.myorders)
orderRouter.get('/order/orders', orderController.orders)
orderRouter.get('/order/vieworders', orderController.viewOrders)
orderRouter.post('/order/ordercancel', orderController.orderCancel)
orderRouter.post('/order/orderaccept', orderController.orderAccept)
orderRouter.post('/order/orderreject', orderController.orderReject)
orderRouter.get('/order/vorders', orderController.vorders)
orderRouter.post('/order/deliver',upload.single('file'), orderController.deliver)
orderRouter.post('/order/orderReview', orderController.orderReview)
orderRouter.get('/order/earnings', orderController.earnings)
orderRouter.post('/order/viewOrderDetail', orderController.viewOrderDetail)
orderRouter.post('/order/withdraw', orderController.withdraw)

// paymentRouter.post('/payment/:id',paymentController.payment)
// paymentRouter.post('/paymentverification', paymentController.paymentVerification)
// paymentRouter.get('/getkey', paymentController.getKey)

export default orderRouter;