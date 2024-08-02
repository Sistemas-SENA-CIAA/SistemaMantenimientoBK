import { DataSource } from "typeorm";
import { Equipo } from "../models/equipoModel";
import { TipoEquipo } from "../models/tipoEquipoModel";
import { CuentaDante } from "../models/cuentaDanteModel";
import { Mantenimiento } from "../models/mantenimientoModel";
import { Usuario } from "../models/usuarioModel";
import { Rol } from "../models/rolModel";
import { Estado } from "../models/estadoModel";
import { Chequeo } from "../models/chequeoModel";
import { Area } from "../models/areaModel";
import { ChequeoMantenimiento } from "../models/ChequeoMantenimiento";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "sismantenimiento",
    logging: true,
    entities: [Equipo, TipoEquipo, CuentaDante, Mantenimiento, Usuario, Rol, Estado, Chequeo, Area, ChequeoMantenimiento],
    synchronize: false
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source ha sido inicializada!');
    })
    .catch((err) => {
        console.error('Ha ocurrido un error en la Data Source:', err);
    });