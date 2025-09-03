class Alimentacion {
    private id: number;
    private descripcion: string;
    private dosis: string;

    constructor(id: number, descripcion: string, dosis: string) {
        this.id = id;
        this.descripcion = descripcion;
        this.dosis = dosis;
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getDosis(): string {
        return this.dosis;
    }

    // Setters
    public setId(id: number): void {
        this.id = id;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public setDosis(dosis: string): void {
        this.dosis = dosis;
    }
}