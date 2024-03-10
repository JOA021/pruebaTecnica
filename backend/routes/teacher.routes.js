import express from 'express';
import { singupTeacher, loginTeacher, getTeacher, deleteTeacherByName, createSubject } from '../controllers/teacher.controllers.js' 

const router  = express.Router()

router.post('/singupTeacher', singupTeacher)
router.post('/loginTeacher', loginTeacher)
router.get('/getTeacher', getTeacher)
router.delete('/deleteTeacher/:name', deleteTeacherByName);
router.post('/createSubject/:teacherId', createSubject)

export default router