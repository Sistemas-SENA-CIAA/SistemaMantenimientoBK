import { Request, Response } from "express";
import { Equipo } from "../models/equipoModel";
import { CuentaDante } from "../models/cuentaDanteModel";
import { AppDataSource } from "../database/conexion";
import { Estado } from "../models/estadoModel";
import { DeepPartial } from "typeorm";
import { validate } from "class-validator";

class EquiposController{
    constructor(){
    }

    
/**
 *  post track
 * @openapi
 * /equipos:
 *      post:
 *          tags:
 *               - usuarios
 *          sumary: "Registrar equipos"
 *          description: Registro de equipos
 *          requestBody:
 *                  content:
 *                      application/json:
 *                          shcema:
 *                              $ref: "#/components/schemas/equipo"
 *          responses:
 *              '201':
 *                  descripcion: Equipo creado correctamente
 *              '401':
 *                  descripcion: No tiene permiso para acceder a esta ruta
 *             security: 
 *               - bearerAuth: [ ]

 */
    async agregarEquipo(req: Request, res: Response){
        try {
            const { serial, marca, referencia, fechaCompra, placaSena, cuentaDante, tipoEquipo, estado, chequeos, sede, subsede, dependencia, mantenimientos, chequeosMantenimiento } = req.body;

            //Verificamos que no exista un equipo con el mismo serial
            const equipoExistente = await Equipo.findOneBy({serial: serial});
            if(equipoExistente){
                return res.status(400).json({ error: 'Este Equipo ya está registrado' });
            }

            //Verificamos que el propietario si exista en la BD
            const  cuentaDanteRegistro = await CuentaDante.findOneBy({documento: cuentaDante});
            if(!cuentaDanteRegistro){
                throw new Error ('Cuentadante no encontrado')
            }

            const equipo = new Equipo();
            equipo.serial = serial;
            equipo.marca = marca;
            equipo.referencia = referencia;
            equipo.fechaCompra = fechaCompra;
            equipo.placaSena = placaSena;
            equipo.cuentaDante = cuentaDante;
            equipo.tipoEquipo = tipoEquipo;
            equipo.estado = estado;
            equipo.chequeos = chequeos;
            equipo.sede = sede;
            equipo.subsede = subsede;
            equipo.dependencia = dependencia;
            equipo.mantenimientos = mantenimientos;
            equipo.chequeosMantenimiento = chequeosMantenimiento;

            const errors = await validate(equipo);
            if (errors.length > 0) {
              return res.status(400).json({ errors });
            }

            //Guardamos el equipo
            const registro = await Equipo.save(equipo);
            res.status(201).json(registro);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Listado de equipos
    async listarEquipos(req: Request, res: Response){
        try {
            const data = await Equipo.find({relations: ['cuentaDante', 'tipoEquipo', 'estado', 'subsede', 'subsede.dependencias', 'dependencia', 'chequeos']});
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
                relations: {cuentaDante: true, tipoEquipo: true, subsede: true}
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

    //Método para actualizar equipos
    async modificarEquipo(req: Request, res: Response) {
        const { serial } = req.params;
        const { cuentaDante, chequeos, mantenimientos, estados, ...otherFields } = req.body;

        try {
            const equipo = await Equipo.findOne({ where: { serial: serial }, relations: ['cuentaDante', 'tipoEquipo', 'chequeos', 'mantenimientos'] });

            if (!equipo) {
            throw new Error('Equipo no encontrado');
            }

            // Asigna los nuevos valores a las propiedades del equipo
            const equipoModificado: DeepPartial<Equipo> = {
                ...equipo,
                ...otherFields,
                cuentaDante,
                chequeos,
                mantenimientos,
                estados
              };
              

            // Guarda los cambios en la base de datos
            await Equipo.save(equipoModificado);

            const registroActualizado = await Equipo.findOne({
                where: { serial: serial },
                relations: ['cuentaDante', 'tipoEquipo', 'chequeos', 'mantenimientos']
            });

            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new EquiposController();