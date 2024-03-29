import express from 'express';
import { singupTeacher, loginTeacher, getTeacher, deleteTeacherByName, createSubject, getSubjects, getSubjectsByGrade } from '../controllers/teacher.controllers.js' 

const router  = express.Router()

router.post('/singupTeacher', singupTeacher)
router.post('/loginTeacher', loginTeacher)
router.get('/getTeacher', getTeacher)
router.delete('/deleteTeacher/:name', deleteTeacherByName);
router.post('/createSubject/:teacherId', createSubject)
router.get('/getSubjects/:teacherId', getSubjects);
router.get('/getSubjectsByGrade/:grade', getSubjectsByGrade);

export default router