import express from "express";
import authController from "../controller/authController";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post('/sendotp', authController.sendOtp);
router.post('/submitotp', authController.submitOtp)

export default router;
