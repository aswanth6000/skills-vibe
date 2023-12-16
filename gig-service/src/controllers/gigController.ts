import {Request, Response} from "express"


const authController = {
    async addGig(req: Request, res: Response){
        return res.status(200).json({ admin: 'admin data' });
    }

}
export default authController