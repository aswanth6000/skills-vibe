import express from 'express';
import messageController from '../controller/messagecontroller';
const router = express.Router();

router.post('/accesschat', messageController.accessChat);
router.get('/fetchchat', messageController.fetchChats)
router.get('/getmessage/:chatId', messageController.allMessages);
router.get('/sendmessage', messageController.sendMessage);
router.get('/searchuser', messageController.searchUsers)


export default router;