import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mantenimiento } from "./mantenimientoModel";

@Entity('insumos')
export class Insumo extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'id_insumo' })
    idInsumo: number;

    @Column("varchar", { length: 80 })
    nombre: string;

    @ManyToOne(() => Mantenimiento, (mantenimiento) => mantenimiento.insumos)
    @JoinColumn({name: 'mantenimiento_id' })
    mantenimiento: Mantenimiento;
}