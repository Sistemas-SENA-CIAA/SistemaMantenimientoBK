import { Request, Response } from "express";
import { Equipo } from "../models/equipoModel";
import { CuentaDante } from "../models/cuentaDanteModel";
import { AppDataSource } from "../database/conexion";
import { Estado } from "../models/estadoModel";

class EquiposController{
    constructor(){
    }

    //Agregar equipo
    async agregarEquipo(req: Request, res: Response){
        try {
            const { serial, cuentaDante } = req.body;

            //Verificamos que no exista un equipo con el mismo serial
            const equipoExistente = await Equipo.findOneBy({serial: serial});
            if(equipoExistente){
                return res.status(400).json({ error: 'Este Equipo ya está registrado' });
            }

            //Verificamos que el propietario si exista en la BD
            const  cuentaDanteRegistro = await CuentaDante.findOneBy({documento: cuentaDante});
            if(!cuentaDanteRegistro){
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
            const data = await Equipo.find({relations: {cuentaDante: true, tipoEquipo: true, estado: true, area: true}});
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
                relations: {cuentaDante: true, tipoEquipo: true, area: true}
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
    async modificarEquipo(req: Request, res: Response) {
        const { serial } = req.params;
        const { cuentaDante, ...otherFields } = req.body;

        try {
            // Verifica si el propietario existe
            // const propietarioRegistro = await CuentaDante.findOneBy({ documento: cuentaDante });
            // if (!propietarioRegistro) {
            //     throw new Error('Propietario no encontrado');
            // }

            // Verifica si el equipo existe
            const equipoExistente = await Equipo.findOneBy({ serial: serial });
            if (!equipoExistente) {
                throw new Error('Equipo no encontrado');
            }

            // Actualiza el equipo con los nuevos datos
            await Equipo.update({ serial: serial }, { ...otherFields });
            const registroActualizado = await Equipo.findOne({ where: { serial: serial }, relations: { cuentaDante: true, tipoEquipo: true, area: true } });

            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    //Modificar estado del Equipo
    async actualizarEstadoEquipo(req: Request, res: Response) {
        const { serial } = req.params;
    
        try {
            const equipo = await Equipo.findOne({ where: { serial : serial }, relations: ["estado"] });
        
            if (equipo) {
                //Se cambia el estado
                const nuevoEstadoValor = !equipo.estado.estado;
                let nuevoEstado = await Estado.findOne({ where: { estado: nuevoEstadoValor } });
        
                //Se crea un nuevo estado en caso de que no exista
                if (!nuevoEstado) {
                    nuevoEstado = Estado.create({ estado: nuevoEstadoValor });
                    await Estado.save(nuevoEstado);
                }
        
                //Actualizo equipo con el nuevo estado 
                equipo.estado = nuevoEstado;
                const equipoActualizado = await Equipo.save(equipo);
        
                return res.status(200).json(equipoActualizado);
            } else {
                return res.status(404).json({ error: 'Equipo no encontrado' });
            }
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new EquiposController();