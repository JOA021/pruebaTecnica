import express from 'express';
import { singupAdmin, loginAdmin, getAdmin, deleteAdminByName } from '../controllers/admin.controllers.js';

const router  = express.Router()

router.post('/singupAdmin', singupAdmin)
router.post('/loginAdmin', loginAdmin)
router.get('/getAdmin', getAdmin)
router.delete('/deleteAdmin/:name', deleteAdminByName)

export default router