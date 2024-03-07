import express from 'express';
import { singupStudent,loginStudent, getStudent } from '../controllers/student.controllers.js'

const router  = express.Router()

router.post('/singupStudent', singupStudent)
router.post('/loginStudent', loginStudent)
router.post('/getStudent', getStudent)

export default router