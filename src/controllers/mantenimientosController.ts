import { Request, Response } from "express";
import { Usuario } from "../models/usuarioModel";
import { Mantenimiento } from "../models/mantenimientoModel";

class MantenimientosController{
    constructor(){
    }

    async agregarMantenimiento(req: Request, res: Response){
        try{
            const { usuario } = req.body;

            //Verificación de que exista el usuario
            const usuarioRegistro = await Usuario.findOneBy({documento: usuario});
            if(!usuarioRegistro){
                throw new Error('Usuario no encontrado')
            }

            const registro = await Mantenimiento.save(req.body);
            res.status(201).json(registro);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async listarMantenimientos(req: Request, res: Response){
        try{
            const data = await Mantenimiento.find({relations: {usuario: true, insumos: true}});
            res.status(200).json(data);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async modificarMantenimiento(req: Request, res: Response){
        const { idMantenimiento } = req.params;
        try{
            const data = await Mantenimiento.findOneBy({idMantenimiento: Number(idMantenimiento)});
            if(!data){
                throw new Error('Mantenimiento no encontrado')
            }

            await Mantenimiento.update({idMantenimiento: Number(idMantenimiento)}, req.body);
            const registroActualizado = await Mantenimiento.findOne({where: {idMantenimiento: Number(idMantenimiento)}, relations: {usuario: true}});

            res.status(200).json(registroActualizado);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new MantenimientosController();