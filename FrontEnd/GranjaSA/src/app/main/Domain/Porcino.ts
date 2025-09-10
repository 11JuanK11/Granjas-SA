import { Cliente } from "./Cliente";
import { RazaPorcino } from "./RazaPorcino";
import { Alimentacion } from "./Alimentacion";

export class Porcino {
    id: string;
    raza: RazaPorcino;
    edad: number;
    peso: number;
    alimentacion: Alimentacion;
    cliente: Cliente | undefined | null;

    constructor(id: string, raza: RazaPorcino, edad: number, peso: number, alimentacion: Alimentacion, cliente: Cliente | undefined | null) {
        this.id = id;
        this.raza = raza;
        this.edad = edad;
        this.peso = peso;
        this.alimentacion = alimentacion;
        this.cliente = cliente;
    }

}