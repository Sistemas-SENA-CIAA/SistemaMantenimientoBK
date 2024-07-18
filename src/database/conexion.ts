import { DataSource } from "typeorm";
import { Equipo } from "../models/equipoModel";
import { TipoEquipo } from "../models/tipoEquipoModel";
import { CuentaDante } from "../models/cuentaDanteModel";
import { IntegranteEquipo } from "../models/integranteEquipoModel";
import { Mantenimiento } from "../models/mantenimientoModel";
import { Insumo } from "../models/insumoModel";
import { Usuario } from "../models/usuarioModel";
import { Rol } from "../models/rolModel";
import { Estado } from "../models/estadoModel";
import { Chequeo } from "../models/chequeoModel";
import { Proveedor } from "../models/proveedorModel";
import { Area } from "../models/areaModel";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "mantenimiento",
    logging: true,
    entities: [Equipo, TipoEquipo, CuentaDante, IntegranteEquipo, Mantenimiento, Insumo, Usuario, Rol, Estado, Chequeo, Proveedor, Area],
    synchronize: false
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source ha sido inicializada!');
    })
    .catch((err) => {
        console.error('Ha ocurrido un error en la Data Source:', err);
    });