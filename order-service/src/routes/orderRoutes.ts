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


orderRouter.post('/payment/:id',orderController.payment )
orderRouter.post('/paymentverification',orderController.paymentVerification);
orderRouter.get('/getkey',orderController.getKey)
orderRouter.get('/myorders', orderController.myorders)
orderRouter.get('/orders', orderController.orders)
orderRouter.get('/vieworders', orderController.viewOrders)
orderRouter.post('/ordercancel', orderController.orderCancel)
orderRouter.post('/orderaccept', orderController.orderAccept)
orderRouter.post('/orderreject', orderController.orderReject)
orderRouter.get('/vorders', orderController.vorders)
orderRouter.post('/deliver',upload.single('file'), orderController.deliver)
orderRouter.post('/orderReview', orderController.orderReview)

// paymentRouter.post('/payment/:id',paymentController.payment)
// paymentRouter.post('/paymentverification', paymentController.paymentVerification)
// paymentRouter.get('/getkey', paymentController.getKey)

export default orderRouter;