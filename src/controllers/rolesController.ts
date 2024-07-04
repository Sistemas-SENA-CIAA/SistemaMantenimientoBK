import { Request, Response } from "express";
import { Rol } from "../models/rolModel";
import { Usuario } from "../models/usuarioModel";
import { AppDataSource } from "../database/conexion";
import { getRepository } from "typeorm";

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

    async asociarUsuario(req: Request, res: Response){
        try {
            const { usuario_documento, rol_id } = req.body;
    
            const usuario = await Usuario.findOne({ where: { documento: usuario_documento } });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            const rol = await Rol.findOne({ where: { id: rol_id } });
            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
    
            //Creamos consulta usando un 'QueryBuilder'
            await AppDataSource.createQueryBuilder()
                .insert()
                .into('roles_usuarios')
                .values({
                    usuario_documento: usuario.documento,
                    rol_id: rol.id
                })
                .execute();
    
            res.status(200).json({ message: 'Rol asignado al usuario correctamente' });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    };
}

export default new RolesController;