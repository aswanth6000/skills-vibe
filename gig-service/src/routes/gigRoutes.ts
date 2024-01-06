import express from "express";
import gigController from '../controllers/gigController'
import multerConfig from '../config/multer';

const router = express.Router();
const upload = multerConfig.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]);

router.post('/addgig',upload, gigController.addGig)
// router.post('/gigstatus', gigController.gigStatus)
router.post('/editgig', upload, gigController.editgig)
router.post('/deletegig', gigController.deletegig )
router.post('/rejectgig', gigController.rejectgig)
router.post('/acceptgig', gigController.acceptgig)



export default router;
