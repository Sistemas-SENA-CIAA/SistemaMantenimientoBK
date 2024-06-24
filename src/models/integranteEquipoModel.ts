import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('integrantes_equipo')
export class IntegranteEquipo extends BaseEntity{
    @PrimaryColumn()
    documento: number;

    @Column("varchar", { length: 80 })
    nombre: string;

    @Column("varchar", { length: 30 })
    telefono: string;

    @Column("varchar", { length: 80 })
    correo: string;
}