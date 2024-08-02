import { BaseEntity, JoinColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chequeo } from "./chequeoModel";
import { Equipo } from "./equipoModel";
import { Mantenimiento } from "./mantenimientoModel";

@Entity('chequeos_mantenimientos')
export class ChequeoMantenimiento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Chequeo)
    @JoinColumn({ name: 'chequeo_id' })
    chequeo: Chequeo;

    @ManyToOne(() => Equipo)
    @JoinColumn({ name: 'equipo_serial' })
    equipo: Equipo;

    @ManyToOne(() => Mantenimiento)
    @JoinColumn({ name: 'mantenimiento_id' })
    mantenimiento: Mantenimiento;
}
