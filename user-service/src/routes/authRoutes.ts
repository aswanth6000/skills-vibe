import express from "express";
import authController from "../controller/authController";

const router = express.Router();

router.post("/signup", authController.getIndex);

export default router;
