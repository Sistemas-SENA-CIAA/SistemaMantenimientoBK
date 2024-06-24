import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Equipo } from "./equipoModel";

@Entity('tipo_equipos')
export class TipoEquipo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 30 })
    nombre: string;

    @OneToMany(() => Equipo, (equipo) => equipo.tipoEquipo)
    equipos: Equipo[];
}