import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { studentModel } from '../models/student.models.js'

export const singupStudent = async (req, res) => {
    try{
        let body = req.body;

        body.password = bcrypt.hashSync(body.password, parseInt(process.env.MASTER_KEY))

        let newStudent = await studentModel.create(body);

        const payload = { _id: newStudent._id};


        let token = jwt.sign(payload, process.env.JWT_KEY);

        const studentData = {
            token,
            student: newStudent,
        }

        res.send(studentData)
    }catch (e){
        console.log(e)
        res.json({error:e.message || 'Error en el servidor'})
    }
}

export const loginStudent = async (req, res) =>{
    try{
        let body = req.body;
        let studentExist = await studentModel.findOne({ email: body.email});
        
        if (!studentExist) {
            return res.json({ token: null, error: "No existe un usuario con este correo electronico"});
        }

        const validationPassword = bcrypt.compareSync(body.password, studentExist.password);

        if (validationPassword) {
            const payload = { _id: studentExist._id};
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

export const getStudent = async (req, res) => {
    let token = req.headers.authorization?.split(' ')[1];;
    let decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    let id = decodedToken._id;
  
    try {
      const studentExist = await studentModel.findOne({ "_id": id });
      res.json(studentExist);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message || 'Error en el servidor' });
    }
  };