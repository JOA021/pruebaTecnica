import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminModel } from '../models/admin.models.js';


export const singupAdmin = async (req, res) => {
    try{
        let body = req.body;

        body.password = bcrypt.hashSync(body.password, parseInt(process.env.MASTER_KEY))

        let newAdmin = await adminModel.create(body);

        const payload = { _id: newAdmin._id};


        let token = jwt.sign(payload, process.env.JWT_KEY);

        const adminData = {
            token,
            admin: newAdmin,
        }

        res.send(adminData)
    }catch (e){
        console.log(e)
        res.json({error:e.message || 'Error en el servidor'})
    }
}

export const loginAdmin = async (req, res) =>{
    try{
        let body = req.body;
        let adminExist = await adminModel.findOne({ email: body.email});
        
        if (!adminExist) {
            return res.json({ token: null, error: "No existe un usuario con este correo electronico"});
        }

        const validationPassword = bcrypt.compareSync(body.password, adminExist.password);

        if (validationPassword) {
            const payload = { _id: adminExist._id};
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

export const getAdmin = async (req, res) => {
    let token = req.headers.authorization?.split(' ')[1];;
    let decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    let id = decodedToken._id;
  
    try {
      const userExist = await usersModel.findOne({ "_id": id });
      res.json(userExist);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message || 'Error en el servidor' });
    }
  };