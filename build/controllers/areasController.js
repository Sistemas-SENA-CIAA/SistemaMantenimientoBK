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
const areaModel_1 = require("../models/areaModel");
const class_validator_1 = require("class-validator");
class AreasController {
    constructor() {
    }
    agregarArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigo, nombre, zona, coordenadas, equipos } = req.body;
                const area = new areaModel_1.Area();
                area.codigo = codigo;
                area.nombre = nombre;
                area.zona = zona;
                area.coordenadas = coordenadas;
                area.equipos = equipos;
                const errors = yield (0, class_validator_1.validate)(area);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                const areaExistente = yield areaModel_1.Area.findOneBy({ codigo: codigo });
                if (areaExistente) {
                    res.status(400).json({ error: "Esta Area ya está registrada" });
                }
                const registro = yield areaModel_1.Area.save(req.body);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    listarAreas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield areaModel_1.Area.find();
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Método para actualizar Areas
    modificarArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigo } = req.params;
            const otherFields = __rest(req.body, []);
            try {
                const area = yield areaModel_1.Area.findOne({ where: { codigo: Number(codigo) } });
                if (!area) {
                    throw new Error('Area no encontrado');
                }
                //Asignamos los nuevos valores a las propiedades del Area
                const areaModificada = Object.assign(Object.assign({}, area), otherFields);
                //Guardamos los cambios en la base de datos
                yield areaModel_1.Area.save(areaModificada);
                const registroActualizado = yield areaModel_1.Area.findOne({
                    where: { codigo: Number(codigo) }
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
exports.default = new AreasController();
