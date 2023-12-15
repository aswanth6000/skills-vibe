import { Request, Response ,NextFunction } from "express";
import bcrypt from 'bcrypt'
import jwt, { Secret ,JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const jwtSecret: Secret = process.env.JWT_KEY || 'defaultSecret'

interface ExtendedRequest extends Request {
    user?: string | JwtPayload | undefined;
  }

export default function verifyToken(req: ExtendedRequest, res: Response, next: NextFunction) {
  let authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    res.status(401).send({ error: 'No token provided' });
  }
  let token = authHeader?.split(' ')[1];
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(500).send({ message: 'Authentication failed' });
      } else {
        (req as ExtendedRequest).user = decoded;
        next();
      }
    });
  }
}