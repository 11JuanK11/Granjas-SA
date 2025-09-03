class Porcino {
    private id: number;
    private raza: RazaPorcino;
    private edad: number;
    private peso: number;
    private alimentacion: Alimentacion;
    private cliente: Cliente;

    constructor(id: number, raza: RazaPorcino, edad: number, peso: number, alimentacion: Alimentacion, cliente: Cliente) {
        this.id = id;
        this.raza = raza;
        this.edad = edad;
        this.peso = peso;
        this.alimentacion = alimentacion;
        this.cliente = cliente;
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getRaza(): RazaPorcino {
        return this.raza;
    }

    public getEdad(): number {
        return this.edad;
    }

    public getPeso(): number {
        return this.peso;
    }

    public getAlimentacion(): Alimentacion {
        return this.alimentacion;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    // Setters
    public setId(id: number): void {
        this.id = id;
    }

    public setRaza(raza: RazaPorcino): void {
        this.raza = raza;
    }

    public setEdad(edad: number): void {
        this.edad = edad;
    }

    public setPeso(peso: number): void {
        this.peso = peso;
    }

    public setAlimentacion(alimentacion: Alimentacion): void {
        this.alimentacion = alimentacion;
    }

    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }
}