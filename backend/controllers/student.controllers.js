import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { studentModel } from '../models/student.models.js'

export const singupStudent = async (req, res) => {
    try{
        let body = req.body;

        body.password = bcrypt.hashSync(body.password, parseInt(process.env.MASTER_KEY))

        let newStudent = await studentModel.create(body);

        res.json(newStudent)
    }catch (e){
        console.log(e)
        res.json({error:e.message || 'Error en el servidor'})
    }
}

export const loginStudent = async (req, res) => {
    try {
        let body = req.body;
        let studentExist = await studentModel.findOne({ email: body.email });

        if (!studentExist) {
            return res.status(401).json({ token: null, error: "Credenciales incorrectas" });
        }

        const validationPassword = bcrypt.compareSync(body.password, studentExist.password);

        if (validationPassword) {
            const payload = { _id: studentExist._id, userType: "student" };
            const token = jwt.sign(payload, process.env.JWT_KEY);
            return res.send({ token, userType: "student", grade: studentExist.grade  });
        } else {
            return res.status(401).json({ token: null, error: "Credenciales incorrectas" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ token: null, error: 'Error en el servidor' });
    }
}

export const getStudent = async (req, res) => {
    try {
        const allStudents = await studentModel.find();

        res.json(allStudents);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message || 'Error en el servidor' });
    }
};

export const deleteStudentByName = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ error: "Se requiere un nombre válido" });
        }

        const deletedStudent = await studentModel.findOneAndDelete({ name });

        if (!deletedStudent) {
            return res.status(404).json({ error: "Profesor no encontrado" });
        }

        res.json(deletedStudent);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message || 'Error en el servidor' });
    }
};