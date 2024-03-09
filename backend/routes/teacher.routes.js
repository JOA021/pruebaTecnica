import express from 'express';
import { singupTeacher, loginTeacher, getTeacher, deleteTeacherByName } from '../controllers/teacher.controllers.js' 

const router  = express.Router()

router.post('/singupTeacher', singupTeacher)
router.post('/loginTeacher', loginTeacher)
router.get('/getTeacher', getTeacher)
router.delete('/deleteTeacher/:name', deleteTeacherByName);

export default router