import express from "express";
import authController from "../controller/authController";

const router = express.Router();

router.get("/", authController.getIndex);

export default router;
