import express from 'express';
import dotenv from 'dotenv';
import { connectDataBase } from './config/db.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(cors());

// Rutas

// Conectar base de datos
connectDataBase();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});