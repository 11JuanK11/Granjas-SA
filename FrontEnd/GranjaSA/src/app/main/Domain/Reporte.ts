import { Cliente } from "./Cliente";
import { Porcino } from "./Porcino";

export class Reporte {
    cliente: Cliente
    porcinos: Porcino[]

    constructor(cliente: Cliente, porcinos: Porcino[]) {
        this.cliente = cliente;
        this.porcinos = porcinos;
    }
}