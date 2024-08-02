import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Equipo } from "./equipoModel";
import { Estado } from "./estadoModel";
import { Length } from "class-validator";

@Entity('cuentadantes')
export class CuentaDante extends BaseEntity{
    @PrimaryColumn()
    documento: number;

    @Column("varchar", { length: 80 })
    @Length(4, 50, { message: "El nombre debe tener entre 4 y 50 caracteres" })
    nombre: string;

    @Column("varchar", { length: 30 })
    @Length(4, 20, { message: "La dependencia debe tener entre 4 y 20 caracteres" })
    dependencia: string;

    @Column("varchar", { length: 30 })
    @Length(4, 50, { message: "El departamento debe tener entre 4 y 50 caracteres" })
    departamento: string;

    @Column("varchar", { length: 30, name: "tipo_contrato" })
    tipoContrato: string;

    @OneToMany(() => Equipo, (equipo) => equipo.cuentaDante)
    equipos: Equipo[];

    @ManyToOne(() => Estado, (estado) => estado.cuentaDante)
    @JoinColumn({name: 'estado_id' })
    estado: Estado;
}