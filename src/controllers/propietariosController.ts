import { Request, Response } from "express";
import { Propietario } from "../models/propietariosModel";

class PropietariosController{
    constructor(){
    }

    async agregarPropietario(req: Request, res: Response){
        try {
            const registro = await Propietario.save(req.body);

            res.status(201).json(registro);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Listado de Propietarios
    async listarPropietarios(req: Request, res: Response){
        try {
            const data = Propietario.find;

            res.status(201).json(data);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Obtener propietario específcio
    async obtenerEquipoPorDocumento(req: Request, res: Response){
        const { documento } = req.params;
        res.send("Saludito desde 'obtenerEquipoPorDocumento' " )
    }

    //Modificar propietario
    async modificarPropietario(req: Request, res: Response){
        const { documento } = req.params;
        res.send("Saludito desde 'modificarPropietario' " )
    }

    //Eliminar equipo
    async eliminarPropietario(req: Request, res: Response){
        const { documento } = req.params;
        res.send("Saludito desde 'eliminarPropietario' " )
    }
}

export default new PropietariosController();