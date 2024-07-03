import { Request, Response } from "express";
import { Estado } from "../models/estadoModel";
 
class EstadosController{
    constructor(){

    }

    async listarEstados(req: Request, res: Response){
        try{
            const data = await Estado.find()
            res.status(200).json(data)
        } catch (err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new EstadosController();