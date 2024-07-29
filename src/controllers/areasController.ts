import { Request, Response } from "express";
import { Area } from "../models/areaModel";
import { DeepPartial } from "typeorm";

class AreasController{
    constructor(){

    }

    async agregarArea(req: Request, res: Response){
        try{
            const { codigo } = req.body;

            const areaExistente = await Area.findOneBy({codigo: codigo})
            if(areaExistente){
                res.status(400).json({error: "Esta Area ya está registrada"})
            }

            const registro = await Area.save(req.body);
            res.status(201).json(registro);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async listarAreas(req: Request, res: Response){
        try{
            const data = await Area.find();
            res.status(200).json(data)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Método para actualizar Areas
    async modificarArea(req: Request, res: Response) {
        const { codigo } = req.params;
        const { ...otherFields } = req.body;
    
        try {
            const area = await Area.findOne({ where: { codigo: Number(codigo) } });
    
            if (!area) {
                throw new Error('Area no encontrado');
            }
    
            //Asignamos los nuevos valores a las propiedades del Area
            const areaModificada: DeepPartial<Area> = {
                ...area,
                ...otherFields 
            };
                  
    
            //Guardamos los cambios en la base de datos
            await Area.save(areaModificada);
    
            const registroActualizado = await Area.findOne({
                where: { codigo: Number(codigo) }
            });
    
            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new AreasController();