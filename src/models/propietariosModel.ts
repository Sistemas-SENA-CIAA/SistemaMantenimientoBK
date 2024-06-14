import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Equipo } from "./equipoModel";

@Entity('propietarios')
export class Propietario extends BaseEntity{
    @PrimaryColumn()
    documento: number;

    @Column("varchar", { length: 80 })
    nombre: string;

    @Column("varchar", { length: 30 })
    dependencia: string;

    @Column("varchar", { length: 30 })
    departamento: string;

    @OneToMany(() => Equipo, (equipo) => equipo.propietario)
    equipos: Equipo[];
}