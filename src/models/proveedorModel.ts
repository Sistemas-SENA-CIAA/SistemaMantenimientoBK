import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { IntegranteEquipo } from "./integranteEquipoModel";
import { Mantenimiento } from "./mantenimientoModel";

@Entity('proveedores')
export class Proveedor extends BaseEntity{
    @PrimaryColumn({name: 'nit_proveedor' })
    nitProveedor: number;

    @Column("varchar", { length: 80 })
    nombre: string;

    @Column("varchar", { length: 30 })
    telefono: string;

    @Column("varchar", { length: 80 })
    correo: string;

    @Column("varchar", { length: 50 })
    ubicacion: string;

    @OneToMany(() => IntegranteEquipo, (integranteEquipo) => integranteEquipo.proveedor)
    integranteEquipo: IntegranteEquipo[];

    @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.proveedor)
    mantenimiento: Mantenimiento[];
}