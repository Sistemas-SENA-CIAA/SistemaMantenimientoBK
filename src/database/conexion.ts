import { DataSource } from "typeorm";
import { Equipo } from "../models/equipoModel";
import { TipoEquipo } from "../models/tipoEquipoModel";
import { Propietario } from "../models/propietariosModel";
import { Proveedor } from "../models/proveedorModel";
import { IntegranteEquipo } from "../models/integranteEquipoModel";
import { Mantenimiento } from "../models/mantenimientoModel";
import { Insumo } from "../models/insumoModel";
import { Usuario } from "../models/usuarioModel";
import { Rol } from "../models/rolModel";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "mantenimiento",
    logging: true,
    entities: [Equipo, TipoEquipo, Propietario, Proveedor, IntegranteEquipo, Mantenimiento, Insumo, Usuario, Rol],
    synchronize: false
})