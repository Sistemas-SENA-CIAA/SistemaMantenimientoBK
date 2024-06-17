import { Request, Response } from "express";
import { Equipo } from "../models/equipoModel";
import { Propietario } from "../models/propietariosModel";

class EquiposController{
    constructor(){
    }

    async agregarEquipo(req: Request, res: Response){
        try {
            const registro = await Equipo.save(req.body);

            res.status(201).json(registro);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Listado de equipos
    async listarEquipos(req: Request, res: Response){
        try {
            const data = await Equipo.find({relations: {propietario: true, tipoEquipo: true}});
            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Obtener equipo específcio
    async obtenerEquipoPorSerial(req: Request, res: Response){
        const { serial } = req.params;

        const registro = await Equipo.findOne({where: {
            serial: serial}, 
            relations: {propietario: true, tipoEquipo: true}
        });

        if(!registro){
            throw new Error('Equipo no encontrado')
        }
        res.status(200).json(registro)
    }

    //Modificar equipo
    async modificarEquipo(req: Request, res: Response){
        const { serial } = req.params;
        try {
            const{ propietario } = req.body;

            const propietarioRegistro = await Propietario.findOneBy({documento: propietario});
            if(!propietarioRegistro){
                throw new Error('Propietario no encontrado')
            }
        } catch (err) {
            
        }
    }

    //Eliminar equipo
    async eliminarEquipo(req: Request, res: Response){
        const { serial } = req.params;
        res.send("Saludito desde 'eliminarEquipo' " )
    }
}

export default new EquiposController();