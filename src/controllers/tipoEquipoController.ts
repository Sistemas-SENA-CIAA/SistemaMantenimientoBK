import { Request, Response } from "express";

export class TipoEquipoController{
    constructor(){
    }

    async agregarTipoEquipo(req: Request, res: Response){
        res.send("Saluditos desde 'agregarEquipo' " )
    }

    async eliminarTipoEquipo(req: Request, res: Response){
        const { id } = req.params;
        res.send("Saludito desde 'eliminarEquipo' " )
    }
}

export default new TipoEquipoController();