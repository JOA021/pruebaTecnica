import express from 'express';
import { singupTeacher, loginTeacher, getTeacher } from '../controllers/teacher.models.js' 

const router  = express.Router()

router.post('/singupTeacher', singupTeacher)
router.post('/loginTeacher', loginTeacher)
router.post('/getTeacher', getTeacher)

export default router