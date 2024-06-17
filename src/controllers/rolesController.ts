import { Request, Response } from "express";
import { Rol } from "../models/rolModel";
import { Usuario } from "../models/usuarioModel";

class RolesController{
    constructor(){

    }

    //Consultar listado de roles
    async listarRoles(req: Request, res: Response){
        try{
            const data = await Rol.find();
            res.status(200).json(data);
        }catch(err){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

    async agregarRol(req: Request, res: Response){
        try{
            const registro = await Rol.save(req.body);
            res.status(201).json(registro);
        }catch (err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async asociarUsuario(req: Request, res: Response) {
        try {
            const { usuario_documento, rol_id } = req.body;
    
            const usuario = await Usuario.findOneBy({ documento: usuario_documento });
            console.log(usuario);
            

            const rol = await Rol.findOneBy({ id: Number(rol_id) });
    
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            if (!rol) {
                throw new Error('Rol no encontrado');
            }
    
            rol.usuarios = rol.usuarios || [];
            rol.usuarios.push(usuario);
    
            const registro = await Rol.save(rol);
    
            res.status(200).json(registro);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }
}

export default new RolesController;