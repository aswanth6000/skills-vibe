import { Request, Response } from 'express';
import consumers from '../events/consumers/gigConsumer';
import gigPublisher from '../events/publishers/gigPublisher';
import { isValidObjectId } from 'mongoose';
import jwt from 'jsonwebtoken'
import { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv'
import GigModel from '../model/Gig';
import cloudinary from '../config/cloudinary';
dotenv.config()

const jwtSecret: Secret = process.env.JWT_KEY || 'defaultSecret'

const gigController = {
    async addGig(req: any, res: Response) {
        try {
            const folderName = 'skillVibe';

            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                return res.status(401).json({ error: 'Unauthorized - Token not provided' });
            }

            let decodedToken: JwtPayload;

            try {
                decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
            } catch (jwtError) {
                console.log('JWT Verification Error:', jwtError);
                return res.status(401).json({ error: 'Unauthorized - Invalid token' });
            }

            console.log('Decoded Token:', decodedToken);

            const userId = decodedToken.userId
            const data = req.body

            try {
                const result = await cloudinary.uploader.upload(req.files['image1'][0].path, { public_id: `${folderName}/${req.files['image1'][0].originalname}` });

                let result1, result2, video;
                if (req.files['image2'] && req.files['image2'][0]) {
                    result1 = await cloudinary.uploader.upload(req.files['image2'][0].path, { public_id: `${folderName}/${req.files['image2'][0].originalname}` });
                }

                if (req.files['image3'] && req.files['image3'][0]) {
                    result2 = await cloudinary.uploader.upload(req.files['image3'][0].path, { public_id: `${folderName}/${req.files['image3'][0].originalname}` });
                }

                if (req.files['video'] && req.files['video'][0]) {
                    video = await cloudinary.uploader.upload_large(req.files['video'][0].path, { resource_type: 'video', public_id: `${folderName}/${req.files['video'][0].originalname}` });
                }

                const newGig = new GigModel({
                    userId,
                    title: data.title,
                    gigdescription: data.description,
                    price: data.price,
                    tags: data.tags,
                    image1: result.secure_url,
                    image2: result1?.secure_url,
                    image3: result2?.secure_url,
                    video: video?.secure_url
                });

                await newGig.save();
                console.log('sssssssssss', newGig._id);
                
                console.log("Gig data inserted to the database");

                res.status(200).json({});
                newGig.refId = newGig._id
                console.log("asedfasdfasdf",newGig);
                
                gigPublisher.gigCreatedEvent(newGig);
                console.log('Data sent to publisher is ', data);
            } catch (error) {
                console.log('Error in addGig:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (error) {
            console.log('Error in addGig:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async gigStatus(req: Request, res: Response){
        
        try {
            
            const objectId = req.body.gigId;
            console.log('hh',objectId);
            
            if (!isValidObjectId(objectId)) {
                return res.status(400).json({ error: 'Invalid ObjectId' });
              }
            
            const gigData = {
              status: req.body.status,
            };     
            const pp = await GigModel.findById(objectId)
            console.log('sss',pp);
                    
            const gig = await GigModel.findByIdAndUpdate(objectId, gigData, { new: true });
            // if (!gig) {
            //   return res.status(404).json({ error: 'Gig not found' });
            // }
            console.log('Updated gig:', gig);
            res.status(200).json({ message: 'Gig status updated successfully', gig });
          } catch (error) {
            console.error('Error updating gig status:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }
};

export default gigController;
