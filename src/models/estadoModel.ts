import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Equipo } from "./equipoModel";
import { Usuario } from "./usuarioModel";

@Entity('estados')
export class Estado extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'id_estado'})
    idEstado: number;

    @Column({ type: 'boolean'})
    estado: boolean;

    @OneToMany(() => Equipo, (equipo) => equipo.estado)
    equipo: Equipo[];

    @OneToMany(() => Usuario, (usuario) => usuario.estado)
    usuario: Usuario[];
}