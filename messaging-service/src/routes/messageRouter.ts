import express from 'express';
import messageController from '../controller/messagecontroller';
const router = express.Router();

router.post('/accesschat', messageController.accessChat);


export default router