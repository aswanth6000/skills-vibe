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

router.post('/gig/addgig',upload, gigController.addGig)
router.post('/gig/editgig', upload, gigController.editgig)
router.post('/gig/deletegig', gigController.deletegig )
router.post('/gig/rejectgig', gigController.rejectgig)
router.post('/gig/acceptgig', gigController.acceptgig)

// router.post('/gigstatus', gigController.gigStatus)


export default router;
