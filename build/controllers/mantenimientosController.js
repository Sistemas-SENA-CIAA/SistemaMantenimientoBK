"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarioModel_1 = require("../models/usuarioModel");
const mantenimientoModel_1 = require("../models/mantenimientoModel");
const conexion_1 = require("../database/conexion");
const equipoModel_1 = require("../models/equipoModel");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
class MantenimientosController {
    constructor() {
    }
    agregarMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { objetivo, tipoMantenimiento, fechaProxMantenimiento, fechaUltimoMantenimiento, usuario, equipos, chequeosMantenimiento } = req.body;
                //Verificación de que exista el usuario
                const usuarioRegistro = yield usuarioModel_1.Usuario.findOneBy({ documento: usuario });
                if (!usuarioRegistro) {
                    throw new Error('Usuario no encontrado');
                }
                const mantenimiento = new mantenimientoModel_1.Mantenimiento();
                mantenimiento.objetivo = objetivo;
                mantenimiento.tipoMantenimiento = tipoMantenimiento;
                mantenimiento.fechaProxMantenimiento = fechaProxMantenimiento;
                mantenimiento.fechaUltimoMantenimiento = fechaUltimoMantenimiento;
                mantenimiento.usuario = usuario;
                mantenimiento.equipos = equipos;
                mantenimiento.chequeosMantenimiento = chequeosMantenimiento;
                const errors = yield (0, class_validator_1.validate)(mantenimiento);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                const registro = yield mantenimientoModel_1.Mantenimiento.save(mantenimiento);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    // async listarMantenimientos(req: Request, res: Response){
    //     try{
    //         const data = await Mantenimiento.find({relations: ['equipos', 'usuario', 'chequeos', 'equipos.cuentaDante', 'equipos.tipoEquipo', 'equipos.estado', 'equipos.chequeos', 'equipos.subsede' ]});
    //         res.status(200).json(data);
    //     }catch(err){
    //         if(err instanceof Error)
    //         res.status(500).send(err.message);
    //     }
    // }
    listarMantenimientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = req.user;
                let mantenimientos;
                if (usuario.rol === 'TÉCNICO EN CAMPO') {
                    mantenimientos = yield mantenimientoModel_1.Mantenimiento.find({ where: { usuario: usuario.documento }, relations: ['equipos', 'usuario', 'chequeos', 'equipos.cuentaDante', 'equipos.tipoEquipo', 'equipos.estado', 'equipos.chequeos', 'equipos.subsede'] });
                }
                else {
                    mantenimientos = yield mantenimientoModel_1.Mantenimiento.find({ relations: ['equipos', 'usuario', 'chequeos', 'equipos.cuentaDante', 'equipos.tipoEquipo', 'equipos.estado', 'equipos.chequeos', 'equipos.subsede'] });
                }
                res.status(200).json(mantenimientos);
            }
            catch (err) {
                res.status(500).json({ error: 'Error al listar los mantenimientos' });
            }
        });
    }
    modificarInfoMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idMantenimiento } = req.params;
            const _a = req.body, { usuario, equipos, chequeos, chequeosMantenimiento } = _a, otherFields = __rest(_a, ["usuario", "equipos", "chequeos", "chequeosMantenimiento"]);
            try {
                const mantenimiento = yield mantenimientoModel_1.Mantenimiento.findOne({ where: { idMantenimiento: Number(idMantenimiento) }, relations: ['usuario', 'chequeos'] });
                if (!mantenimiento) {
                    throw new Error('Mantenimiento no encontrado');
                }
                const mantenimientoModificado = Object.assign(Object.assign(Object.assign({}, mantenimiento), otherFields), { usuario,
                    equipos,
                    chequeos,
                    chequeosMantenimiento });
                yield mantenimientoModel_1.Mantenimiento.save(mantenimientoModificado);
                const registroActualizado = yield mantenimientoModel_1.Mantenimiento.findOne({ where: { idMantenimiento: Number(idMantenimiento) }, relations: ['usuario']
                });
                res.status(200).json(registroActualizado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500);
                }
            }
        });
    }
    //Método para asociar equipos a un mantenimiento
    asociarEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idMantenimiento, equipos } = req.body;
            //Extraemos los seriales de los equipos del JSON
            const equipo_seriales = equipos.map((equipo) => equipo.serial);
            console.log(equipo_seriales);
            //Verificamos existencia del mantenimiento
            const mantenimiento = yield mantenimientoModel_1.Mantenimiento.findOne({ where: { idMantenimiento } });
            if (!mantenimiento) {
                return res.status(404).json({ message: 'Mantenimiento no encontrado' });
            }
            //Verifica existencia de los equipos 
            const equiposEncontrados = yield equipoModel_1.Equipo.find({
                where: {
                    serial: (0, typeorm_1.In)(equipo_seriales)
                }
            });
            //Validamos que el número de 'equiposEncontrados' coincida con el número de seriales
            if (equiposEncontrados.length !== equipo_seriales.length) {
                return res.status(404).json({ message: 'Uno o más equipos no fueron encontrados' });
            }
            //Inserta las relaciones en la tabla mantenimientos_equipos
            const queryRunner = conexion_1.AppDataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            //Hacemos una iteración sobre el arreglo de 'equiposEncontrados' e insertamos el serial de cada equipo en la entidad
            try {
                for (const equipo of equiposEncontrados) {
                    yield queryRunner.manager.createQueryBuilder()
                        .insert()
                        .into('mantenimientos_equipos')
                        .values({
                        equipo_serial: equipo.serial,
                        mantenimiento_id: mantenimiento.idMantenimiento,
                    })
                        .execute();
                }
                yield queryRunner.commitTransaction();
                return res.status(201).json({ message: 'Equipos asociados correctamente' });
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                console.error(error);
                return res.status(500).json({ message: 'Error al asociar equipos', error });
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    listarEquiposAsociadosMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idMantenimiento } = req.params;
            try {
                const mantenimiento = yield conexion_1.AppDataSource.getRepository(mantenimientoModel_1.Mantenimiento).findOne({
                    where: { idMantenimiento: parseInt(idMantenimiento) },
                    relations: ['equipos', 'equipos.cuentaDante', 'equipos.tipoEquipo', 'equipos.estado', 'equipos.chequeos', 'equipos.subsede', 'equipos.chequeos.mantenimiento', 'equipos.mantenimientos'],
                });
                if (!mantenimiento) {
                    return res.status(404).json({ message: 'Mantenimiento no encontrado' });
                }
                res.json(mantenimiento.equipos);
            }
            catch (error) {
                console.error('Error al obtener los equipos:', error);
                res.status(500).json({ message: 'Error al obtener los equipos' });
            }
        });
    }
}
exports.default = new MantenimientosController();
