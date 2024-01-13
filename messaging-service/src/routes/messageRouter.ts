import express from 'express';
import messageController from '../controller/messagecontroller';
const router = express.Router();

router.post('/accesschat', messageController.accessChat);
router.get('/test', messageController.test)


export default router