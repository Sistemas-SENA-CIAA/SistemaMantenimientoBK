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
const equipoModel_1 = require("../models/equipoModel");
const cuentaDanteModel_1 = require("../models/cuentaDanteModel");
const class_validator_1 = require("class-validator");
class EquiposController {
    constructor() {
    }
    agregarEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serial, marca, referencia, fechaCompra, placaSena, cuentaDante, tipoEquipo, estado, chequeos, sede, subsede, dependencia, ambiente, mantenimientos, chequeosMantenimiento } = req.body;
                //Verificamos que no exista un equipo con el mismo serial
                const equipoExistente = yield equipoModel_1.Equipo.findOneBy({ serial: serial });
                if (equipoExistente) {
                    return res.status(400).json({ error: 'Este Equipo ya está registrado' });
                }
                //Verificamos que el propietario si exista en la BD
                const cuentaDanteRegistro = yield cuentaDanteModel_1.CuentaDante.findOneBy({ documento: cuentaDante });
                if (!cuentaDanteRegistro) {
                    throw new Error('Cuentadante no encontrado');
                }
                const equipo = new equipoModel_1.Equipo();
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
                equipo.chequeosMantenimiento = chequeosMantenimiento;
                const errors = yield (0, class_validator_1.validate)(equipo);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                //Guardamos el equipo
                const registro = yield equipoModel_1.Equipo.save(equipo);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Listado de equipos
    listarEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield equipoModel_1.Equipo.find({ relations: ['cuentaDante', 'tipoEquipo', 'estado', 'subsede', 'equipo.mantenimientos', 'mantenimientos', 'dependencia', 'ambiente', 'chequeos'] });
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Obtener equipo específcio
    obtenerEquipoPorSerial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serial } = req.params;
            try {
                const registro = yield equipoModel_1.Equipo.findOne({ where: {
                        serial: serial
                    },
                    relations: { cuentaDante: true, tipoEquipo: true, subsede: true }
                });
                if (!registro) {
                    throw new Error('Equipo no encontrado');
                }
                res.status(200).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Método para actualizar equipos
    modificarEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serial } = req.params;
            const _a = req.body, { cuentaDante, chequeos, mantenimientos, estados } = _a, otherFields = __rest(_a, ["cuentaDante", "chequeos", "mantenimientos", "estados"]);
            try {
                const equipo = yield equipoModel_1.Equipo.findOne({ where: { serial: serial }, relations: ['cuentaDante', 'tipoEquipo', 'chequeos', 'mantenimientos'] });
                if (!equipo) {
                    throw new Error('Equipo no encontrado');
                }
                // Asigna los nuevos valores a las propiedades del equipo
                const equipoModificado = Object.assign(Object.assign(Object.assign({}, equipo), otherFields), { cuentaDante,
                    chequeos,
                    mantenimientos,
                    estados });
                // Guarda los cambios en la base de datos
                yield equipoModel_1.Equipo.save(equipoModificado);
                const registroActualizado = yield equipoModel_1.Equipo.findOne({
                    where: { serial: serial },
                    relations: ['cuentaDante', 'tipoEquipo', 'chequeos', 'mantenimientos']
                });
                res.status(200).json(registroActualizado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new EquiposController();
