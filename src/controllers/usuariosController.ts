import { Request, Response } from "express";
import { Usuario } from "../models/usuarioModel";
import { Estado } from "../models/estadoModel";

class UsuariosController {
    constructor(){

    }

    //Listado de usuarios del sistema
    async listarUsuarios(req: Request, res:Response) {
        try {
            const data = await Usuario.find({relations: {roles:true, estado: true}});
            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Obtener Usuario específcio
    async obtenerUsuarioPorDocumento(req: Request, res: Response){
        const { documento } = req.params;
        try {
            const data = await Usuario.findOneBy({documento: Number(documento)});
            if(!data){
                throw new Error('Usuario no encontrado');
            }
            res.status(200).json(data);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
    
    async modificarDatosUsuario(req: Request, res: Response){
        const { documento } = req.params;
        try{
            const data = await Usuario.findOneBy({documento: Number(documento)});
            if(!data){
                throw new Error('Usuario no encontrado')
            }
    
            await Usuario.update({documento: Number(documento)}, req.body);
            const registroActualizado = await Usuario.findOne({where: {documento: Number(documento)}});
    
            res.status(200).json(registroActualizado);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Actualizar estado del Usuario
    async actualizarEstadoUsuario(req: Request, res: Response) {
        const { documento } = req.params;
    
        try {
            const usuario = await Usuario.findOne({ where: { documento: Number(documento) }, relations: ["estado"] });
    
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            const nuevoEstadoValor = !usuario.estado.estado;
            let nuevoEstado = await Estado.findOne({ where: { estado: nuevoEstadoValor } });
    
            if (!nuevoEstado) {
                nuevoEstado = Estado.create({ estado: nuevoEstadoValor });
                await Estado.save(nuevoEstado);
            }
    
            // Actualizo usuario con el nuevo estado
            usuario.estado = nuevoEstado;
            const usuarioActualizado = await Usuario.save(usuario);
    
            return res.status(200).json(usuarioActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }    
}

export default new UsuariosController();