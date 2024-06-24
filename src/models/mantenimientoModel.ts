import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Insumo } from "./insumoModel";
import { Usuario } from "./usuarioModel";

@Entity('mantenimientos')
export class Mantenimiento extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'id_mantenimiento' })
    idMantenimiento: number;

    @Column('text')
    objetivo: string;

    @Column("varchar", { length: 50 })
    tipoMantenimiento: string;

    @Column('date', {name: 'fecha_prox_mantenimiento'})
    fechaProxMantenimiento: Date;

    @Column('date', {name: 'fecha_ultimo_mantenimiento'})
    fechaUltimoMantenimiento: Date;

    @OneToMany(() => Insumo, (insumo) => insumo.mantenimiento)
    insumos: Insumo[];

    @ManyToOne(() => Usuario, (usuario) => usuario.mantenimientos)
    @JoinColumn({name: 'usuario_documento' })
    usuario: Usuario;
}