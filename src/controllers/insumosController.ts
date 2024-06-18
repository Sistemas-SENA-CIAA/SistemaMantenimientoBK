import { Request, Response } from "express";
import { Mantenimiento } from "../models/mantenimientoModel";
import { Insumo } from "../models/insumoModel";

class InsumosController{
    constructor(){

    }

    async agregarInsumo(req: Request, res: Response){
        try{
            const { mantenimiento } = req.body;
             
            const registroMantenimiento = await Mantenimiento.findOneBy({ idMantenimiento: mantenimiento });
            if(!registroMantenimiento){
                throw new Error('Mantenimiento no encontrado');
            }

            const registro = await Insumo.save(req.body);
            res.status(201).json(registro);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async listarInsumos(req: Request, res: Response){
        try {
            const data = await Insumo.find({relations: {mantenimiento: true}});
            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new InsumosController();