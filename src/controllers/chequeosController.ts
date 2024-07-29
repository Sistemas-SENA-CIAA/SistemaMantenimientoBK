import { Request, Response } from "express";
import { Chequeo } from "../models/chequeoModel";
import { Equipo } from "../models/equipoModel";

class ChequeosController{
    constructor(){

    }

    //Método para listar chequeos
    async listarChequeos(req: Request, res: Response){
      try{
        const data = Chequeo.find();

        res.status(200).json(data);
      }catch (err) {
        if(err instanceof Error)
        res.status(500).send(err.message);
      }
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
          console.log("Chequeo: " + chequeo + "Equipo: " + equipo);
          
      
          if (!equipo) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
          }
      
          if (chequeo) {
            //Actualiza el chequeo existente
            chequeo.descripcion = descripcion;
            chequeo.observaciones = observaciones;
            chequeo.equipo.serial = equipo_serial;  
            await chequeo.save();  // Guarda los cambios
          } else {
            // Crea un nuevo chequeo si no existe
            chequeo = await Chequeo.create({
              descripcion,
              observaciones,
              equipo // Asigna el ID del equipo encontrado
            });
            await chequeo.save(); // Guarda el nuevo chequeo
          }
      
          res.status(200).json({ message: 'Chequeo actualizado correctamente' });
    } catch (error) {
          console.error('Error al actualizar chequeo:', error);
          res.status(500).json({ message: 'Error al actualizar chequeo', error });
    }
  }   
}

export default new ChequeosController();