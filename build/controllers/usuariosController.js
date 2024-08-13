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
const estadoModel_1 = require("../models/estadoModel");
class UsuariosController {
    constructor() {
    }
    //Listado de usuarios del sistema
    listarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield usuarioModel_1.Usuario.find({ relations: { roles: true, estado: true } });
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Obtener Usuario específcio
    obtenerUsuarioPorDocumento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { documento } = req.params;
            try {
                const data = yield usuarioModel_1.Usuario.findOneBy({ documento: Number(documento) });
                if (!data) {
                    throw new Error('Usuario no encontrado');
                }
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    modificarDatosUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { documento } = req.params;
            const _a = req.body, { estado } = _a, otherFields = __rest(_a, ["estado"]);
            try {
                const usuario = yield usuarioModel_1.Usuario.findOne({ where: { documento: Number(documento) }, relations: ['estado'] });
                if (!usuario) {
                    throw new Error('usuario no encontrado');
                }
                // Asigna los nuevos valores a las propiedades del usuario
                const usuarioModificado = Object.assign(Object.assign(Object.assign({}, usuario), otherFields), { estado });
                // Guarda los cambios en la base de datos
                yield usuarioModel_1.Usuario.save(usuarioModificado);
                const registroActualizado = yield usuarioModel_1.Usuario.findOne({
                    where: { documento: Number(documento) },
                    relations: ['estado']
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
    //Actualizar estado del Usuario
    actualizarEstadoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { documento } = req.params;
            try {
                const usuario = yield usuarioModel_1.Usuario.findOne({ where: { documento: Number(documento) }, relations: ["estado"] });
                if (!usuario) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                const nuevoEstadoValor = !usuario.estado.estado;
                let nuevoEstado = yield estadoModel_1.Estado.findOne({ where: { estado: nuevoEstadoValor } });
                if (!nuevoEstado) {
                    nuevoEstado = estadoModel_1.Estado.create({ estado: nuevoEstadoValor });
                    yield estadoModel_1.Estado.save(nuevoEstado);
                }
                // Actualizo usuario con el nuevo estado
                usuario.estado = nuevoEstado;
                const usuarioActualizado = yield usuarioModel_1.Usuario.save(usuario);
                return res.status(200).json(usuarioActualizado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    obtenerRolUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documento } = req.params;
                const usuario = yield usuarioModel_1.Usuario.findOne({ where: { documento: Number(documento) }, relations: ['roles'] });
                if (!usuario) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
                //Seleccionamos primer rol del usuario
                const rol = usuario.roles.length > 0 ? usuario.roles[0].nombre : null;
                res.json({ rol });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener el rol del usuario', error });
            }
        });
    }
}
exports.default = new UsuariosController();
