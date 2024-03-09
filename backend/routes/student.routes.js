import express from 'express';
import { singupStudent,loginStudent, getStudent, deleteStudentByName } from '../controllers/student.controllers.js'

const router  = express.Router()

router.post('/singupStudent', singupStudent)
router.post('/loginStudent', loginStudent)
router.get('/getStudent', getStudent)
router.delete('/deleteStudent/:name', deleteStudentByName)

export default router