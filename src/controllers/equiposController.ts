import { Request, Response } from "express";

class EquiposController{
    constructor(){
    }

    async agregarEquipo(req: Request, res: Response){
        res.send("Saluditos desde 'agregarEquipo' " )
    }

    //Listado de equipos
    async listarEquipos(req: Request, res: Response){
        res.send("Saludito desde 'listarEquipos' " )
    }

    //Obtener equipo específcio
    async obtenerEquipoPorId(req: Request, res: Response){
        const { id } = req.params;
        res.send("Saludito desde 'obtenerEquipoPorId' " )
    }

    //Modificar equipo
    async modificarEquipo(req: Request, res: Response){
        const { id } = req.params;
        res.send("Saludito desde 'modificarEquipo' " )
    }

    //Eliminar equipo
    async eliminarEquipo(req: Request, res: Response){
        const { id } = req.params;
        res.send("Saludito desde 'eliminarEquipo' " )
    }
}

export default new EquiposController();