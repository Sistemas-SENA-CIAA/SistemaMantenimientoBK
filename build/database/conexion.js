"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const equipoModel_1 = require("../models/equipoModel");
const tipoEquipoModel_1 = require("../models/tipoEquipoModel");
const cuentaDanteModel_1 = require("../models/cuentaDanteModel");
const mantenimientoModel_1 = require("../models/mantenimientoModel");
const usuarioModel_1 = require("../models/usuarioModel");
const rolModel_1 = require("../models/rolModel");
const estadoModel_1 = require("../models/estadoModel");
const chequeoModel_1 = require("../models/chequeoModel");
const areaModel_1 = require("../models/areaModel");
const ChequeoMantenimiento_1 = require("../models/ChequeoMantenimiento");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "sismantenimiento",
    logging: true,
    entities: [equipoModel_1.Equipo, tipoEquipoModel_1.TipoEquipo, cuentaDanteModel_1.CuentaDante, mantenimientoModel_1.Mantenimiento, usuarioModel_1.Usuario, rolModel_1.Rol, estadoModel_1.Estado, chequeoModel_1.Chequeo, areaModel_1.Area, ChequeoMantenimiento_1.ChequeoMantenimiento],
    synchronize: false
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source ha sido inicializada!');
})
    .catch((err) => {
    console.error('Ha ocurrido un error en la Data Source:', err);
});
