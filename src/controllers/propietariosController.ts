import { Request, Response } from "express";

class PropietariosController{
    constructor(){
    }

    async agregarPropietario(req: Request, res: Response){
        res.send("Saluditos desde 'agregarPropietario' " )
    }

    //Listado de Propietarios
    async listarPropietarios(req: Request, res: Response){
        res.send("Saludito desde 'listarPropietarios' " )
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