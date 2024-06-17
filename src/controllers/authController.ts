import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { Usuario } from "../models/usuarioModel";
import { generarToken } from "../helpers/tokenHelper";

class AuthController{
    constructor(){

    }

    //Registro de Usuario
    async registrarUsuario(req: Request, res: Response){
        try{
            //Encriptación de contraseña
            req.body.contrasenia = bcrypt.hashSync(req.body.contrasenia, 10);

            const registro = await Usuario.save(req.body);

            res.status(201).json(registro);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Login de Usuario
    async loginUsuario(req: Request, res: Response){
        const { correo, contrasenia } = req.body;

        try {
            const usuario = await Usuario.findOne({where: { correo }});

            if(!usuario){
                return res.status(401).json({ error:'Usuario o Contraseña incorrectos' });
            }

            const contraseniaCorrecta = await bcrypt.compare(contrasenia, usuario.contrasenia);

            if(!contraseniaCorrecta){
                return res.status(401).json({ error: 'Usuario o Contraseña incorrectos' });
            }

            //Llamado al Helper
            const token = generarToken(usuario);

            res.send({
                correo: usuario.correo,
                token
            });

        }catch(err){
            res.status(500).json({ error: 'Ha ocurrido un error en la Autenticación.' })
        }
    }

    async saludar(req: Request, res: Response){
        res.send("Saluditos desde  'ruta-protegida' ");
    }
}

export default new AuthController();