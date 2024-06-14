import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuarioModel";

@Entity('roles')
export class Rol extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Usuario, usuario => usuario.roles)
    usuarios: Usuario[];
}