export class Cliente {
    cedula: number;
    nombres: string;
    apellidos: string;
    direccion: string;
    telefono: string;

    constructor(cedula: number, nombres: string, apellidos: string, direccion: string, telefono: string) {
        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}