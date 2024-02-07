import express from 'express';
import messageController from '../controller/messagecontroller';
const router = express.Router();

router.post('/accesschat', messageController.accessChat);
router.get('/fetchchat', messageController.fetchChats)
router.get('/getmessage/:chatId', messageController.allMessages);
router.post('/sendmessage', messageController.sendMessage);
router.get('/searchuser', messageController.searchUsers);
router.get('/findchats', messageController.fetchChats)
router.get('/generateMeeting', messageController.meetingCodeGenerator)


export default router;