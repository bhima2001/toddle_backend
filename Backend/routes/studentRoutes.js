import express from 'express'
import {registerStudent,loginStudent,logoutStudent,getAllStudents,allClassesIn,getAllFiles} from '../controllers/studentController.js'
import {isAuthenticatedStudent} from '../middlewares/auth.js'

const router=express.Router();

router.route('/student/register').post(registerStudent);
router.route('/student/login').post(loginStudent);
router.route('/student/logout').get(logoutStudent);
router.route('/students').get(getAllStudents);
router.route('/student/classes').get(isAuthenticatedStudent,allClassesIn);
router.route('/student/class/:classId/files').get(isAuthenticatedStudent,getAllFiles);

export default router;