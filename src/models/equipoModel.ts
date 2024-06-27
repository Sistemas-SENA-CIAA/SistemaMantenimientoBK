import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { TipoEquipo } from "./tipoEquipoModel";
import { Propietario } from "./propietariosModel";
import { Estado } from "./estadoModel";
import { Chequeo } from "./chequeoModel";

@Entity('equipos')
export class Equipo extends BaseEntity{
    @PrimaryColumn()
    serial: string;

    @Column("varchar", { length: 60 })
    marca: string;

    @Column("varchar", { length: 100 })
    referencia: string;

    @Column('date', { name: 'fecha_compra' })
    fechaCompra: Date;

    @Column("varchar", { length: 30, name: 'codigo_area'})
    codigoArea: string;

    @Column("varchar", { length: 30, name:'placa_sena' })
    placaSena: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => TipoEquipo, (tipoEquipo) => tipoEquipo.equipos)
    @JoinColumn({name: 'tipo_id' })
    tipoEquipo: TipoEquipo;

    @ManyToOne(() => Propietario, (propietario) => propietario.equipos)
    @JoinColumn({name: 'propietario_documento' })
    propietario: Propietario;

    @ManyToOne(() => Estado, (estado) => estado.equipo)
    @JoinColumn({name: 'estado_id' })
    estado: Estado;

    @OneToMany(() => Chequeo, (chequeo) => chequeo.equipo)
    chequeos: Chequeo[];
}