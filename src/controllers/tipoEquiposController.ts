import { Request, Response } from "express";
import { TipoEquipo } from "../models/tipoEquipoModel";
import { DeepPartial } from "typeorm";

export class TipoEquiposController{
    constructor(){
    }

    async listarTipoEquipos(req: Request, res: Response){
        try{
            const data = await TipoEquipo.find()
            res.status(200).json(data)
        } catch (err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async agregarTipoEquipo(req: Request, res: Response){
        try {
            const registro = await TipoEquipo.save(req.body);

            res.status(201).json(registro);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Método para actualizar Tipos
    async modificarTipo(req: Request, res: Response) {
        const { id } = req.params;
        const { ...otherFields } = req.body;
        
        try {
            const tipoEquipo = await TipoEquipo.findOne({ where: { id: Number(id) } });
        
            if (!tipoEquipo) {
                throw new Error('tipoEquipo no encontrado');
            }
        
                //Asignamos los nuevos valores a las propiedades del Tipo equipo
            const tipoEquipoModificado: DeepPartial<TipoEquipo> = {
                ...tipoEquipo,
                ...otherFields 
            };
                      
        
            //Guardamos los cambios en la base de datos
            await TipoEquipo.save(tipoEquipoModificado);
        
            const registroActualizado = await TipoEquipo.findOne({
                where: { id: Number(id) }
            });
        
            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new TipoEquiposController();