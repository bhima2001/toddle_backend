import express from 'express'
import {registerTutor,loginTutor,logoutTutor,getAllTutors,allClassesCreated,allFilesCreated} from '../controllers/tutorController.js'
import {isAuthenticatedTutor} from '../middlewares/auth.js'


const router=express.Router();


router.route('/tutor/register').post(registerTutor);
router.route('/tutor/login').post(loginTutor);
router.route('/tutor/logout').get(logoutTutor);
router.route('/tutors').get(getAllTutors);
router.route('/tutor/classes').get(isAuthenticatedTutor,allClassesCreated)
router.route('/tutor/class/:classId/files').get(isAuthenticatedTutor,allFilesCreated)


export default router;

