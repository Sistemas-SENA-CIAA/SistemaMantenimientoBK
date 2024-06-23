import { Request, Response } from "express";
import { Usuario } from "../models/usuarioModel";

class UsuariosController {
    constructor(){

    }

    //Listado de usuarios del sistema
    async listarUsuarios(req: Request, res:Response) {
        try {
            const data = await Usuario.find({relations: {roles:true}});
            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Obtener Usuario específcio
    async obtenerUsuarioPorDocumento(req: Request, res: Response){
        const { documento } = req.params;
        try {
            const data = await Usuario.findOneBy({documento: Number(documento)});
            if(!data){
                throw new Error('Usuario no encontrado');
            }
            res.status(200).json(data);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
    
    async modificarDatosUsuario(req: Request, res: Response){
        const { documento } = req.params;
        try{
            const data = await Usuario.findOneBy({documento: Number(documento)});
            if(!data){
                throw new Error('Usuario no encontrado')
            }
    
            await Usuario.update({documento: Number(documento)}, req.body);
            const registroActualizado = await Usuario.findOne({where: {documento: Number(documento)}});
    
            res.status(200).json(registroActualizado);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new UsuariosController();