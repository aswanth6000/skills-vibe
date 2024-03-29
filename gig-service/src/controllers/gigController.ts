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
// @DESC user can add gig
// @METHOD  post
// @PATH /addgig
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

                let result1: any, result2: any;
                if (req.files['image2'] && req.files['image2'][0]) {
                    result1 = await cloudinary.uploader.upload(req.files['image2'][0].path, { public_id: `${folderName}/${req.files['image2'][0].originalname}` });
                }

                if (req.files['image3'] && req.files['image3'][0]) {
                    result2 = await cloudinary.uploader.upload(req.files['image3'][0].path, { public_id: `${folderName}/${req.files['image3'][0].originalname}` });
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
                    // video: video?.secure_url
                });

                await newGig.save();

                
                console.log("Gig data inserted to the database");

                res.status(200).json({});
                newGig.refId = newGig._id
                
                gigPublisher.gigCreatedEvent(newGig);
                
            } catch (error) {
                console.log('Error in addGig:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (error) {
            console.log('Error in addGig:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
// @DESC user can edit gig
// @METHOD  post
// @PATH /editgig
    async editgig(req: Request, res: Response){
        console.log('request recieved');
        
        try {
            console.log(req.body);
            
        } catch (error) {
            console.log(error);
            
        }
    },
// @DESC user can delete gig
// @METHOD  post
// @PATH /deletegig
    async deletegig(req: Request, res: Response){
        console.log('request recieved');
        
        try {
            const {refId} = req.body
            console.log(refId);
            
            const deletedGig = await GigModel.findByIdAndDelete( refId );

            if (!deletedGig) {
              return res.status(404).json({ message: 'Gig not found' });
            }
        
            res.status(200).json({ message: 'Gig deleted successfully' });
            gigPublisher.gigDeleteEvent(refId)
        
        } catch (error) {
            console.log(error);
            
        }
    },
// @DESC admin can reject the gig
// @METHOD  post
// @PATH /rejectgig
    async rejectgig(req: Request, res: Response){
        const {gigId} = req.body; 
        console.log(req.body);
        try {
            const updateGig = await GigModel.findByIdAndUpdate(gigId, {status: false}, {new: true});
            await gigPublisher.gigStatusRejectEvent(gigId)            
            return res.status(200).json({
                message: "success", updateGig
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'internal server error'})
        }
    },
// @DESC admin can accept the gig
// @METHOD  post
// @PATH /acceptgig
    async acceptgig(req: Request, res: Response){
        const {gigId} = req.body; 
        console.log(req.body);
        
        try {
            const updateGig = await GigModel.findByIdAndUpdate(gigId, {status: true}, {new: true});
            console.log(updateGig);
            
            return res.status(200).json({
                message: "success", updateGig
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'internal server error'})
        }
    }
};

export default gigController;
