import express from 'express';
import { isAuthenticatedTutor } from '../middlewares/auth.js';
import {uploadFile,deleteFile} from '../controllers/fileController.js'
import multer from 'multer';


const router=express.Router();


router.route('/file/:classId/upload').post(isAuthenticatedTutor,multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('file'),uploadFile);

router.route('/file/:fileId').delete(isAuthenticatedTutor,deleteFile)



export default router;