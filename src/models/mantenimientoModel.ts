import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Insumo } from "./insumoModel";
import { Proveedor } from "./proveedorModel";

@Entity('mantenimientos')
export class Mantenimiento extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'id_mantenimiento' })
    idMantenimiento: number;

    @Column('text')
    objetivo: string;

    @Column("varchar", { length: 50 })
    responsable: string;

    @Column('date', {name: 'fecha_prox_mantenimiento'})
    fechaProxMantenimiento: Date;

    @Column('date', {name: 'fecha_ultimo_mantenimiento'})
    fechaUltimoMantenimiento: Date;

    @OneToMany(() => Insumo, (insumo) => insumo.mantenimiento)
    insumos: Insumo[];

    @ManyToOne(() => Proveedor, (proveedor) => proveedor.mantenimiento)
    @JoinColumn({name: 'nit_proveedor' })
    proveedor: Proveedor;
}