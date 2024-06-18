import { Request, Response } from "express";
import { Equipo } from "../models/equipoModel";
import { Propietario } from "../models/propietariosModel";

class EquiposController{
    constructor(){
    }

    //Agregar equipo
    async agregarEquipo(req: Request, res: Response){
        try {
            const { propietario } = req.body;

            //Verificamos que el propietario si exista en la BD
            const propietarioRegistro = await Propietario.findOneBy({documento: propietario});
            if(!propietarioRegistro){
                throw new Error ('Propietario no encontrado')
            }

            //Guardamos el equipo
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
        try {
            const registro = await Equipo.findOne({where: {
                serial: serial}, 
                relations: {propietario: true, tipoEquipo: true}
            });
    
            if(!registro){
                throw new Error('Equipo no encontrado')
            }
            res.status(200).json(registro);
        } catch (err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Modificar equipo
    async modificarEquipo(req: Request, res: Response){
        const { serial } = req.params;
        try {
            const{ propietario } = req.body;

            //Obtengo los registros de las entidades relacionadas
            const propietarioRegistro = await Propietario.findOneBy({documento: propietario});
            if(!propietarioRegistro){
                throw new Error('Propietario no encontrado')
            }

            const data = await Equipo.findOneBy({serial: serial});
            if(!data){
                throw new Error('Equipo no encontrado')
            }

            //Actualizo el registro y le asigno el 'req.body'
            await Equipo.update({serial: serial}, req.body);
            const registroActualizado = await Equipo.findOne({where: {serial: serial}, relations: {propietario: true, tipoEquipo: true}});

            res.status(200).json(registroActualizado);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Eliminar equipo
    async eliminarEquipo(req: Request, res: Response){
        const { serial } = req.params;
        try {
            const data = Equipo.findOneBy({serial: serial});
            if(!data){
                throw new Error ('Equipo no encontrado');
            }
            await Equipo.delete({serial: serial});
            res.status(204);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new EquiposController();