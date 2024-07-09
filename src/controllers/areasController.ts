import { Request, Response } from "express";
import { Area } from "../models/areaModel";

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
}

export default new AreasController();