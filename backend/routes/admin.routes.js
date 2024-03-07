import express from 'express';
import { singupAdmin, loginAdmin, getAdmin } from '../controllers/admin.controllers.js';

const router  = express.Router()

router.post('/singupAdmin', singupAdmin)
router.post('/loginAdmin', loginAdmin)
router.post('/getAdmin', getAdmin)

export default router