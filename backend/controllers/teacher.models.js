import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { teacherModel } from '../models/teacher.models.js'

export const singupTeacher = async (req, res) => {
    try{
        let body = req.body;

        body.password = bcrypt.hashSync(body.password, parseInt(process.env.MASTER_KEY))

        let newTeacher = await teacherModel.create(body);

        const payload = { _id: newTeacher._id};


        let token = jwt.sign(payload, process.env.JWT_KEY);

        const teacherData = {
            token,
            teacher: newTeacher,
        }

        res.send(teacherData)
    }catch (e){
        console.log(e)
        res.json({error:e.message || 'Error en el servidor'})
    }
}
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
    let token = req.headers.authorization?.split(' ')[1];;
    let decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    let id = decodedToken._id;

    try {
      const teacherExist = await teacherModel.findOne({ "_id": id });
      res.json(teacherExist);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message || 'Error en el servidor' });
    }
  };