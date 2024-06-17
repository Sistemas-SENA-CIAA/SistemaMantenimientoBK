import { Request, Response } from "express";
import { TipoEquipo } from "../models/tipoEquipoModel";

export class TipoEquiposController{
    constructor(){
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

    async eliminarTipoEquipo(req: Request, res: Response){
        const { id } = req.params;
        res.send("Saludito desde 'eliminarEquipo' " )
    }
}

export default new TipoEquiposController();