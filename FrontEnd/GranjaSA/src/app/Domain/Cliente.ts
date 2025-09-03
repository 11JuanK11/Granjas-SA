class Cliente {
    private cedula: number;
    private nombres: string;
    private apellidos: string;
    private direccion: string;
    private telefono: string;

    constructor(cedula: number, nombres: string, apellidos: string, direccion: string, telefono: string) {
        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    // Getters
    public getCedula(): number {
        return this.cedula;
    }

    public getNombres(): string {
        return this.nombres;
    }

    public getApellidos(): string {
        return this.apellidos;
    }

    public getDireccion(): string {
        return this.direccion;
    }

    public getTelefono(): string {
        return this.telefono;
    }

    // Setters
    public setCedula(cedula: number): void {
        this.cedula = cedula;
    }

    public setNombres(nombres: string): void {
        this.nombres = nombres;
    }

    public setApellidos(apellidos: string): void {
        this.apellidos = apellidos;
    }

    public setDireccion(direccion: string): void {
        this.direccion = direccion;
    }

    public setTelefono(telefono: string): void {
        this.telefono = telefono;
    }
}