import { Request, Response } from "express";
import { Chequeo } from "../models/chequeoModel";

class ChequeosController{
    constructor(){

    }

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

    // async actualizarChequeo(req: Request, res: Response) {
    //     const { equipo_serial, descripcion, observaciones } = req.body;
      
    //     try {
    //       let chequeo = await Chequeo.findOne({ where: { equipo : equipo_serial } });
      
    //       if (chequeo) {
    //         chequeo.descripcion = descripcion;
    //         chequeo.observaciones = observaciones;
    //         await chequeo.save();
    //       } else {
    //         chequeo = Chequeo.create({ descripcion, observaciones, equipo_serial });
    //         await Chequeo.save();
    //       }
      
    //       res.status(200).json({ message: 'Chequeo actualizado correctamente' });
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).json({ message: 'Error al actualizar chequeo', error });
    //     }
    // }
}

export default new ChequeosController();