import { Request, Response } from "express";
import { User } from "../models/User";

const authController = {
  getIndex(req: Request, res: Response) {
    res.send({ message: "received" });
    console.log(req.body);
    
  },
};

export default authController;
