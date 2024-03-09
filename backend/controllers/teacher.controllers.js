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
            return res.status(401).json({ token: null, error: "Credenciales incorrectas" });
        }

        const validationPassword = bcrypt.compareSync(body.password, teacherExist.password);

        if (validationPassword) {
            const payload = { _id: teacherExist._id, userType: "student"};  
            const token = jwt.sign(payload, process.env.JWT_KEY);
            return res.send({ token, userType: "teacher" });
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
        const allTeachers = await teacherModel.find();

        res.json(allTeachers);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message || 'Error en el servidor' });
    }
};

export const deleteTeacherByName = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ error: "Se requiere un nombre válido" });
        }

        const deletedTeacher = await teacherModel.findOneAndDelete({ name });

        if (!deletedTeacher) {
            return res.status(404).json({ error: "Profesor no encontrado" });
        }

        res.json(deletedTeacher);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message || 'Error en el servidor' });
    }
};