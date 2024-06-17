import { Request, Response } from "express";
import { Usuario } from "../models/usuarioModel";

class UsuariosController {
    constructor(){

    }

    //Listado de usuarios del sistema
    async consultar(req: Request, res:Response) {
        try {
            const data = await Usuario.find({relations: {roles:true}});
            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new UsuariosController();