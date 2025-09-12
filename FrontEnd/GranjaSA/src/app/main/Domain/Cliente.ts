import { Porcino } from "./Porcino";

export class Cliente {
    cedula: number;
    nombres: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    porcinos?: Porcino[]

    constructor(cedula: number, nombres: string, apellidos: string, direccion: string, telefono: string, porcinos?: Porcino[]) {
        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
        this.porcinos = porcinos;
    }
}