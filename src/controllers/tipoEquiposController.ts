import { Request, Response } from "express";
import { TipoEquipo } from "../models/tipoEquipoModel";
import { DeepPartial } from "typeorm";
import { validate } from "class-validator";

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

    //Agregar Nuevo tipo de equipo
    async agregarTipoEquipo(req: Request, res: Response){
        try {
            const { nombre } = req.body;
        
            const tipo = new TipoEquipo();
            tipo.nombre = nombre;

            const errors = await validate(tipo);
            if (errors.length > 0) {
              return res.status(400).json({ errors });
            }
            const registro = await TipoEquipo.save(tipo);

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