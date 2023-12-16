import { Request, Response } from 'express';
import consumers from '../events/consumers/gigConsumer';

const gigController = {
    async addGig(req: Request, res: Response) {
        try {
            const loginEvnt: any = await consumers.listenForUserLoggedInEvent();
            console.log('kkkkk', loginEvnt.userId);
            return res.status(200).json({});
        } catch (error) {
            console.error('Error in addGig:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

export default gigController;