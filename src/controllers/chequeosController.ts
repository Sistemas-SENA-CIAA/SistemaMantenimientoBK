import { Request, Response } from "express";
import { Chequeo } from "../models/chequeoModel";

class ChequeosController{
    constructor(){

    }

    async agregarChequeo(req: Request, res: Response){
        try{
            const { equipo_serial, descripcion, observaciones } = req.body;

            const nuevoChequeo = new Chequeo();
            nuevoChequeo.equipo = equipo_serial;
            nuevoChequeo.observaciones = observaciones;
            nuevoChequeo.descripcion = descripcion;
    
            await nuevoChequeo.save();
    
            return res.status(201).json({ message: "Chequeo creado correctamente", chequeo: nuevoChequeo });
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new ChequeosController();