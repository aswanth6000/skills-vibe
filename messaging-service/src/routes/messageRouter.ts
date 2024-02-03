import express from 'express';
import messageController from '../controller/messagecontroller';
const router = express.Router();

router.post('message/accesschat', messageController.accessChat);
router.get('message/fetchchat', messageController.fetchChats)
router.get('message/getmessage/:chatId', messageController.allMessages);
router.post('message/sendmessage', messageController.sendMessage);
router.get('message/searchuser', messageController.searchUsers);
router.get('message/findchats', messageController.fetchChats)
router.get('message/generateMeeting', messageController.meetingCodeGenerator)


export default router;