import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Equipo } from "./equipoModel";
import { Length } from "class-validator";

@Entity('areas')
export class Area extends BaseEntity{
    @PrimaryColumn({name: 'codigo'})
    codigo: number;

    @Column("varchar", { length: 100 })
    @Length(3, 50, { message: "El nombre del area debe tener entre 3 y 50 caracteres" })
    nombre: string;

    @Column("varchar", { length: 100 })
    @Length(4, 50, { message: "El nombre debe tener entre 4 y 50 caracteres" })
    zona: string;

    @Column("varchar", { length: 100 })
    coordenadas: string;

    @OneToMany(() => Equipo, (equipo) => equipo.area)
    equipos: Equipo[];
}