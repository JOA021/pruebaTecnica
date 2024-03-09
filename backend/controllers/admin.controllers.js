import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminModel } from '../models/admin.models.js';


export const singupAdmin = async (req, res) => {
    try{
        let body = req.body;

        body.password = bcrypt.hashSync(body.password, parseInt(process.env.MASTER_KEY))

        let newAdmin = await adminModel.create(body);

        res.send(newAdmin)
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
            const payload = { _id: adminExist._id, userType: "admin"};
            const token = jwt.sign(payload, process.env.JWT_KEY);
            return res.send({ token, userType: "admin" });
        } else {
            return res.send({ token: null, error: "Credenciales incorrectas"})
        }
    } catch (e) {
        console.log(e)
        return res.json({ token: null, error: e.message || 'Error en el servidor' });
    }     
}

export const getAdmin = async (req, res) => {
    try {
        // Obtén todos los profesores en la base de datos
        const allAdmins = await adminModel.find();

        // Devuelve la lista de profesores
        res.json(allAdmins);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message || 'Error en el servidor' });
    }
};

export const deleteAdminByName = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ error: "Se requiere un nombre válido" });
        }

        const deleteAdmind = await adminModel.findOneAndDelete({ name });

        if (!deleteAdmind) {
            return res.status(404).json({ error: "Profesor no encontrado" });
        }

        res.json(deleteAdmind);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message || 'Error en el servidor' });
    }
  };