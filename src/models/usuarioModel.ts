import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Rol } from "./rolModel";
import { Mantenimiento } from "./mantenimientoModel";
import { Estado } from "./estadoModel";

@Entity('usuarios')
export class Usuario extends BaseEntity{
    @PrimaryColumn()
    documento: number;

    @Column("varchar", { length: 80 })
    nombre: string;

    @Column('date', { name: 'fecha_inicio' })
    fechaInicio: Date;

    @Column('date', { name: 'fecha_fin' })
    fechaFin: Date;

    @Column('text')
    observaciones: String;

    @Column("varchar", { length: 80 })
    correo: string;

    @Column()
    contrasenia: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Rol, rol => rol.usuarios)
    @JoinTable({
        name: 'roles_usuarios',
        joinColumn: { name: 'usuario_documento', referencedColumnName: 'documento' },
        inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' }
    })
    roles: Rol[];

    @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.usuario)
    mantenimientos: Mantenimiento[];

    @ManyToOne(() => Estado, (estado) => estado.usuario)
    @JoinColumn({name: 'estado_id' })
    estado: Estado;
}