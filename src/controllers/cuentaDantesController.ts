import { Request, Response } from "express";
import { CuentaDante } from "../models/cuentaDanteModel";

class PropietariosController{
    constructor(){
    }

    async agregarCuentaDante(req: Request, res: Response){
        try {
            const { documento } = req.body;

            //Verificación existencia del propietario
            const cuentaDanteExistente = await CuentaDante.findOneBy({documento : documento});
            if(cuentaDanteExistente){
                return res.status(400).json({ error: 'Este CuentaDante ya está registrado' });
            }

            const registro = await CuentaDante.save(req.body);

            res.status(201).json(registro);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Listado de Propietarios
    async listarCuentaDantes(req: Request, res: Response){
        try {
            const data = await CuentaDante.find({relations: {equipos: true}});

            res.status(200).json(data);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Obtener propietario específcio
    async obtenerCuentaDantesPorDocumento(req: Request, res: Response){
        const { documento } = req.params;
        try {
            const data = await CuentaDante.findOneBy({documento: Number(documento)});
            if(!data){
                throw new Error('CuentaDante no encontrado');
            }
            res.status(200).json(data);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async modificarDatosCuentaDante(req: Request, res: Response){
        const { documento } = req.params;
        try{
            const data = await CuentaDante.findOneBy({documento: Number(documento)});
            if(!data){
                throw new Error('CuentaDante no encontrado')
            }

            await CuentaDante.update({documento: Number(documento)}, req.body);
            const registroActualizado = await CuentaDante.findOne({where: {documento: Number(documento)}});

            res.status(200).json(registroActualizado);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new PropietariosController();