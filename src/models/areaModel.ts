import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Equipo } from "./equipoModel";

@Entity('areas')
export class Area extends BaseEntity{
    @PrimaryColumn({name: 'codigo'})
    codigo: number;

    @Column("varchar", { length: 100 })
    nombre: string;

    @Column("varchar", { length: 100 })
    zona: string;

    @Column("varchar", { length: 100 })
    coordenadas: string;

    @OneToMany(() => Equipo, (equipo) => equipo.area)
    equipos: Equipo[];
}