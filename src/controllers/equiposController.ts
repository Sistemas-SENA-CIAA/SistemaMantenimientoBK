import { Request, Response } from "express";
import { Equipo } from "../models/equipoModel";
import { CuentaDante } from "../models/cuentaDanteModel";
import { DeepPartial } from "typeorm";
import { validate } from "class-validator";
import { Sede } from "../models/sedeModel";
import { Subsede } from "../models/subsedeModel";
import { TipoEquipo } from "../models/tipoEquipoModel";
import { EquipoRow } from "../interfaces/equipo.interface";
import * as XLSX from 'xlsx';
import { Estado } from "../models/estadoModel";
import { Dependencia } from "../models/dependenciaModel";
import { Ambiente } from "../models/ambienteModel";
import { log } from "console";


class EquiposController{
    constructor(){
    }

    async agregarEquipo(req: Request, res: Response){
        try {
            const { serial, marca, referencia, fechaCompra, placaSena, cuentaDante, tipoEquipo, estado, chequeos, sede, subsede, dependencia, ambiente, mantenimientos, chequeosMantenimiento } = req.body;

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
            equipo.ambiente = ambiente;
            equipo.mantenimientos = mantenimientos;

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
            const data = await Equipo.find({relations: ['cuentaDante', 'tipoEquipo', 'estado', 'subsede', 'mantenimientos', 'dependencia', 'ambiente', 'chequeos']});

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

    async importarEquipos(req: Request, res: Response) {
        try {
            // Suponiendo que el archivo XLSX se envía como FormData
            const file = req.file?.buffer; // Obtener el buffer del archivo subido
            console.log("ARCHIVO: " + file);
            
    
            if (!file) {
                return res.status(400).json({ message: 'No se subió ningún archivo' });
            }
    
            // Leer el archivo como un buffer
            const workbook = XLSX.read(file, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0]; // Obtener el nombre de la primera hoja
            const worksheet = workbook.Sheets[sheetName]; // Obtener los datos de la hoja
        
            // Convertir los datos de la hoja a un array de objetos
            const data: EquipoRow[] = XLSX.utils.sheet_to_json(worksheet);
    
            const equipos: Equipo[] = data.map(item => {
                // Validación y mapeo
                return new Equipo({
                    serial: item.serial,
                    marca: item.marca,
                    referencia: item.referencia,
                    fechaCompra: new Date(item.fechaCompra),
                    placaSena: item.placaSena,
                    tipoEquipo: item.tipoEquipo,
                    cuentaDante: item.cuentaDante,
                    sede: item.sede,
                    subsede: item.subsede,
                    dependencia: item.dependencia,
                    ambiente: item.ambiente
                });
            });
    
            console.log(equipos);
            // Guardar los datos en la base de datos
            await Equipo.save(equipos);
    
            res.json({ message: 'Datos importados correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al importar datos' });
        }
    }   
}

export default new EquiposController();