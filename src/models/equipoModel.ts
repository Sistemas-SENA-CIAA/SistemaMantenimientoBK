import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { TipoEquipo } from "./tipoEquipoModel";
import { Propietario } from "./propietariosModel";

@Entity('equipos')
export class Equipo extends BaseEntity{
    @PrimaryColumn()
    serial: string;

    @Column("varchar", { length: 60 })
    marca: string;

    @Column("varchar", { length: 100 })
    referencia: string;

    @Column("varchar", { length: 100, name: 'host_name' })
    hostName: string;

    @Column("varchar", { length: 30, name: 'sistema_operativo' })
    sistemaOperativo: string;

    @Column("varchar", { length: 100, name: 'software_instalado' })
    softwareInstalado: string;

    @Column('date', { name: 'fecha_compra' })
    fechaCompra: Date;

    @Column('datetime', { name: 'marca_temporal' })
    marcaTemporal: Date;

    @Column("varchar", { length: 30, name: 'codigo_area'})
    codigoArea: string;

    @Column("varchar", { length: 30, name:'placa_sena' })
    placaSena: string;

    @Column('boolean', {name:'software_no_autorizado'})
    softwareNoAutorizado: string;

    //@OneToOne(() => TipoEquipo)
    //@JoinColumn({name: 'tipo_id' })
    //tipoEquipo: TipoEquipo;
    @ManyToOne(() => TipoEquipo, (tipoEquipo) => tipoEquipo.equipos)
    @JoinColumn({name: 'tipo_id' })
    tipoEquipo: TipoEquipo;

    @ManyToOne(() => Propietario, (propietario) => propietario.equipos)
    @JoinColumn({name: 'propietario_documento' })
    propietario: Propietario;
}