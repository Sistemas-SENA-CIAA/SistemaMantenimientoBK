import { Request, Response } from "express";
import { TipoEquipo } from "../models/tipoEquipoModel";

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
}

export default new TipoEquiposController();