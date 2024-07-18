import { Request, Response } from "express";
import { Chequeo } from "../models/chequeoModel";
import { Equipo } from "../models/equipoModel";

class ChequeosController{
    constructor(){

    }

    //Método para crear un chequeo
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

    async actualizarChequeo(req: Request, res: Response) {
        const { idChequeo, descripcion, observaciones, equipo_serial } = req.body;

        try {
            let chequeo = await Chequeo.findOne({ where: { idChequeo } });
            let equipo = await Equipo.findOne({ where: { serial: equipo_serial } }); 

            if (!equipo) {
                return res.status(404).json({ message: 'Equipo no encontrado' });
            }

            //Si el chequeo existe, se le asigna la nueva info que viene en el req.body
            if (chequeo) {
                chequeo.descripcion = descripcion;
                chequeo.observaciones = observaciones;
                chequeo.equipo = equipo; 
                await chequeo;
                //Si el equipo no existe, se crea uno nuevo y se le asigna la info
            } else {
                chequeo = Chequeo.create({
                    idChequeo,
                    descripcion,
                    observaciones,
                    equipo // Asigna el equipo encontrado
                });
                await chequeo.save();
            }

            res.status(200).json({ message: 'Chequeo actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar chequeo:', error);
            res.status(500).json({ message: 'Error al actualizar chequeo', error });
        }
    }
}

export default new ChequeosController();