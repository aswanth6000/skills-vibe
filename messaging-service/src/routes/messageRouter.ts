import express from 'express';
import messageController from '../controller/messagecontroller';
const router = express.Router();

router.post('/accesschat', messageController.accessChat);
router.get('/fetchchat', messageController.fetchChats)
router.post('/getmessage', messageController.allMessages);
router.post('/sendmessage', messageController.sendMessage);
router.get('/searchuser', messageController.searchUsers);
router.get('/findchats', messageController.fetchChats)


export default router;