import express from 'express';
import dotenv from 'dotenv';
import { connectDataBase } from './config/db.js';
import cors from 'cors';
import routerAdmin from './routes/admin.routes.js';
import routerStudent from './routes/student.routes.js';
import routerTeacher from './routes/teacher.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(cors());

// Rutas
app.use('/admin',  routerAdmin)
app.use('/student', routerStudent)
app.use('/teacher', routerTeacher)
// Conectar base de datos
connectDataBase();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});