"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dateConverterHelper_1 = require("../helpers/dateConverterHelper");
const XLSX = __importStar(require("xlsx"));
class EquiposController {
    constructor() {
    }
    agregarEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serial, marca, referencia, fechaCompra, placaSena, cuentaDante, tipoEquipo, estado, chequeos, sede, subsede, dependencia, ambiente, mantenimientos } = req.body;
                //Verificación de equipo con el mismo serial
                const equipoExistente = yield equipoModel_1.Equipo.findOneBy({ serial });
                if (equipoExistente) {
                    return res.status(400).json({ error: 'Este Equipo ya está registrado' });
                }
                //Verificación de existencia de cuentadante
                const cuentaDanteRegistro = yield cuentaDanteModel_1.CuentaDante.findOneBy({ documento: cuentaDante });
                if (!cuentaDanteRegistro) {
                    throw new Error('Cuentadante no encontrado');
                }
                //Nueva instancia de equipo
                const equipo = new equipoModel_1.Equipo();
                equipo.serial = serial;
                equipo.marca = marca;
                equipo.referencia = referencia;
                equipo.fechaCompra = fechaCompra;
                equipo.placaSena = placaSena;
                equipo.cuentaDante = cuentaDanteRegistro;
                equipo.tipoEquipo = tipoEquipo;
                equipo.estado = estado;
                equipo.chequeos = chequeos;
                equipo.sede = sede;
                equipo.subsede = subsede;
                equipo.dependencia = dependencia;
                equipo.ambiente = ambiente;
                equipo.mantenimientos = mantenimientos;
                //Verificación si hay una imagen en el archivo subido
                if (req.file) {
                    equipo.imagenUrl = req.file.path;
                }
                const errors = yield (0, class_validator_1.validate)(equipo);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                const registro = yield equipoModel_1.Equipo.save(equipo);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    //Listado de equipos
    listarEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield equipoModel_1.Equipo.find({ relations: ['cuentaDante', 'tipoEquipo', 'estado', 'subsede', 'mantenimientos', 'dependencia', 'ambiente', 'chequeos'] });
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
    importarEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                if (!file) {
                    return res.status(400).json({ message: 'No se subió ningún archivo' });
                }
                //Leemos el archivo como un buffer
                const workbook = XLSX.read(file, { type: 'buffer' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                //Convertimos los datos del worksheet a un array de objetos
                const data = XLSX.utils.sheet_to_json(worksheet);
                //Iteramos sobre los equipos del archivo Excel
                const equipos = yield Promise.all(data.map((item) => __awaiter(this, void 0, void 0, function* () {
                    let fechaCompra;
                    if (typeof item.fechaCompra === 'number') {
                        fechaCompra = (0, dateConverterHelper_1.excelDateToDate)(item.fechaCompra);
                    }
                    else {
                        fechaCompra = new Date(item.fechaCompra);
                    }
                    return new equipoModel_1.Equipo({
                        serial: item.serial,
                        marca: item.marca,
                        referencia: item.referencia,
                        fechaCompra: fechaCompra,
                        placaSena: item.placaSena,
                        tipoEquipo: item.tipoEquipo,
                        cuentaDante: item.cuentaDante,
                        sede: item.sede,
                        subsede: item.subsede,
                        dependencia: item.dependencia,
                        ambiente: item.ambiente,
                        imagenUrl: item.imagenUrl,
                    });
                })));
                // Guardamos los equipos en la base de datos
                yield equipoModel_1.Equipo.save(equipos);
                res.json({ message: 'Datos importados correctamente' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error al importar datos' });
            }
        });
    }
    generarDatosCvEspecifico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serial } = req.params;
            try {
                // Obtener el equipo y todas las relaciones necesarias
                const equipo = yield equipoModel_1.Equipo.findOne({
                    where: { serial: serial },
                    relations: ['cuentaDante', 'mantenimientos', 'mantenimientos.usuario', 'mantenimientos.chequeos', 'subsede', 'dependencia', 'ambiente', 'tipoEquipo']
                });
                if (!equipo) {
                    return res.status(404).json({ message: "Equipo no encontrado" });
                }
                //Filtro de datos específicos
                const mantenimientos = equipo.mantenimientos.map(mantenimiento => ({
                    idMantenimiento: mantenimiento.idMantenimiento,
                    fechaProximoMantenimiento: mantenimiento.fechaProxMantenimiento,
                    fechaUltimoMantenimiento: mantenimiento.fechaUltimoMantenimiento,
                    usuario: mantenimiento.usuario,
                    chequeos: mantenimiento.chequeos.map(chequeo => ({
                        idChequeo: chequeo.idChequeo,
                        descripcion: chequeo.descripcion,
                        equipoSerialChequeo: chequeo.equipo.serial //Obtenemos el serial del equipo relacionado con el chequeo
                    }))
                }));
                res.status(200).json({
                    equipo,
                    mantenimientos: mantenimientos,
                });
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
