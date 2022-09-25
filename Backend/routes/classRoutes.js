import express from 'express'
import {createAClass,addToClass,deleteStudent,classFiles} from '../controllers/classController'
import {isAuthenticatedStudent,isAuthenticatedTutor} from '../middlewares/auth'
const router=express.Router();

router.route('/class/create').post(isAuthenticatedTutor,createAClass);

router.route('/class/add').post(isAuthenticatedTutor,addToClass)

router.route('/class/delete/:classId/students/:studentId').delete(isAuthenticatedTutor,deleteStudent)

router.route('/class/:classId/files').get(classFiles)

export default router;