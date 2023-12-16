import express from "express";
import gigController from '../controllers/gigController'

const router = express.Router();

router.post('/addgig', gigController.addGig)



export default router;
