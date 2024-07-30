import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Equipo } from "./equipoModel";
import { Mantenimiento } from "./mantenimientoModel";

@Entity('chequeos')
export class Chequeo extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'id_chequeo'})
    idChequeo: number;

    @Column("varchar", { length: 50 })
    descripcion: string;

    @Column("varchar", { length: 150 })
    observaciones: string;

    @ManyToOne(() => Equipo, (equipo) => equipo.chequeos)
    @JoinColumn({name: 'equipo_serial' })
    equipo: Equipo;

    @ManyToMany(() => Mantenimiento, mantenimiento => mantenimiento.chequeos)
    @JoinTable({
        name: 'mantenimientos_chequeos',
        joinColumn: { name: 'chequeo_id',
        referencedColumnName: 'idChequeo' },
        inverseJoinColumn: { name: 'mantenimiento_id',
         referencedColumnName: 'idMantenimiento'}
    })
    mantenimientos: Mantenimiento[];
}