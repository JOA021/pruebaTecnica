import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { teacherModel } from '../models/teacher.models.js'

export const singupTeacher = async (req, res) => {
    try {
        let body = req.body;

        body.password = bcrypt.hashSync(body.password, parseInt(process.env.MASTER_KEY));

        let newTeacher = await teacherModel.create(body);

        res.json(newTeacher);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message || 'Error en el servidor' });
    }
};
export const loginTeacher = async (req, res) =>{
    try{
        let body = req.body;
        let teacherExist = await teacherModel.findOne({ email: body.email});
        
        if (!teacherExist) {
            return res.json({ token: null, error: "No existe un usuario con este correo electronico"});
        }

        const validationPassword = bcrypt.compareSync(body.password, teacherExist.password);

        if (validationPassword) {
            const payload = { _id: teacherExist._id};
            const token = jwt.sign(payload, process.env.JWT_KEY);
            return res.send({ token });
        } else {
            return res.send({ token: null, error: "Credenciales incorrectas"})
        }
    } catch (e) {
        console.log(e)
        return res.json({ token: null, error: e.message || 'Error en el servidor' });
    }     
}

export const getTeacher = async (req, res) => {
    try {
        // Obtén todos los profesores en la base de datos
        const allTeachers = await teacherModel.find();

        // Devuelve la lista de profesores
        res.json(allTeachers);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message || 'Error en el servidor' });
    }
};

export const deleteTeacherByName = async (req, res) => {
    try {
        const { name } = req.params;

        // Verifica si el nombre es proporcionado
        if (!name) {
            return res.status(400).json({ error: "Se requiere un nombre válido" });
        }

        // Busca al profesor por nombre y elimínalo
        const deletedTeacher = await teacherModel.findOneAndDelete({ name });

        // Verifica si se encontró y eliminó al profesor
        if (!deletedTeacher) {
            return res.status(404).json({ error: "Profesor no encontrado" });
        }

        // Devuelve la información del profesor eliminado
        res.json(deletedTeacher);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message || 'Error en el servidor' });
    }
};