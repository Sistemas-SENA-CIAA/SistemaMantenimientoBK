import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Length } from "class-validator";
import { TipoEquipo } from "./tipoEquipoModel";
import { CuentaDante } from "./cuentaDanteModel";
import { Estado } from "./estadoModel";
import { Chequeo } from "./chequeoModel";
import { Mantenimiento } from "./mantenimientoModel";
import { Area } from "./areaModel";
import { ChequeoMantenimiento } from "./ChequeoMantenimiento";

@Entity('equipos')
export class Equipo extends BaseEntity{
    @PrimaryColumn()
    serial: string;

    @Column("varchar", { length: 60 })
    @Length(2, 20, { message: "La marca debe tener entre 2 y 20 caracteres" })
    marca: string;

    @Column("varchar", { length: 100 })
    @Length(4, 50, { message: "La referencia debe tener entre 4 y 20 caracteres" })
    referencia: string;

    @Column('date', { name: 'fecha_compra' })
    fechaCompra: Date;

    @Column("varchar", { length: 30, name:'placa_sena' })
    @Length(6, 20, { message: "La placa debe tener entre 4 y 20 caracteres" })
    placaSena: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => TipoEquipo, (tipoEquipo) => tipoEquipo.equipos)
    @JoinColumn({name: 'tipo_id' })
    tipoEquipo: TipoEquipo;

    @ManyToOne(() => CuentaDante, (cuentadante) => cuentadante.equipos)
    @JoinColumn({name: 'cuentadante_documento' })
    cuentaDante: CuentaDante;

    @ManyToOne(() => Estado, (estado) => estado.equipo)
    @JoinColumn({name: 'estado_id' })
    estado: Estado;

    @OneToMany(() => Chequeo, (chequeo) => chequeo.equipo)
    chequeos: Chequeo[];

    @ManyToOne(() => Area, (area) => area.equipos)
    @JoinColumn({name: 'area_codigo'})
    area: Area;

    @ManyToMany(() => Mantenimiento, mantenimiento => mantenimiento.equipos)
    @JoinTable({
        name: 'mantenimientos_equipos',
        joinColumn: { name: 'equipo_serial', referencedColumnName: 'serial' },
        inverseJoinColumn: { name: 'mantenimiento_id', referencedColumnName: 'idMantenimiento' }
    })
    mantenimientos: Mantenimiento[];

    @OneToMany(() => ChequeoMantenimiento, (chequeoMantenimiento) => chequeoMantenimiento.equipo)
    chequeosMantenimiento: ChequeoMantenimiento[];
}