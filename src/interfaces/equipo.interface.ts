export interface EquipoRow {
    serial: string;
    marca: string;
    referencia: string;
    fechaCompra: Date;
    placaSena: string;
    tipoEquipo: number;                // Relacionado con TipoEquipo
    cuentaDante?: number; // Relacionado con CuentaDante
    estado?: boolean;             // Relacionado con Estado
    sede?: number;               // Relacionado con Sede
    subsede?: number;            // Relacionado con Subsede
    dependencia?: number;        // Relacionado con Dependencia
    ambiente?: number;           // Relacionado con Ambiente
}
