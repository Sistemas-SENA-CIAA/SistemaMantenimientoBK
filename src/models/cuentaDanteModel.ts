import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Equipo } from "./equipoModel";

@Entity('cuentadantes')
export class CuentaDante extends BaseEntity{
    @PrimaryColumn()
    documento: number;

    @Column("varchar", { length: 80 })
    nombre: string;

    @Column("varchar", { length: 30 })
    dependencia: string;

    @Column("varchar", { length: 30 })
    departamento: string;

    @Column("varchar", { length: 30, name: "tipo_contrato" })
    tipoContrato: string;

    @OneToMany(() => Equipo, (equipo) => equipo.cuentaDante)
    equipos: Equipo[];
}