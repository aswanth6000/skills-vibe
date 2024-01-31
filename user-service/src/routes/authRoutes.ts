import express from "express";
import authController from "../controller/authController";

const router = express.Router();

router.post("/user/signup", authController.signup);
router.post("/user/login", authController.login);
router.post('/user/sendotp', authController.sendOtp);
router.post('/user/submitotp', authController.submitOtp);
router.post('/user/submitpassword', authController.changePassword)

export default router;
