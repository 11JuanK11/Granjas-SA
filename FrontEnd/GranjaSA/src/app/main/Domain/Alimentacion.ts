export class Alimentacion {
    id?: number;
    descripcion: string;
    dosis: string;

    constructor(id: number | undefined = undefined, descripcion: string, dosis: string) {
        this.id = id;
        this.descripcion = descripcion;
        this.dosis = dosis;
    }
}