import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Equipo } from "./equipoModel";
import { IsNotEmpty, Length } from "class-validator";

@Entity('tipo_equipos')
export class TipoEquipo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 30 })
    @IsNotEmpty({ message: "El tipo de equipo es obligatorio" })
    @Length(3, 20, { message: "El tipo debe tener entre 4 y 20 caracteres" })
    nombre: string;

    @OneToMany(() => Equipo, (equipo) => equipo.tipoEquipo)
    equipos: Equipo[];
}