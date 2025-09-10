import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cliente } from 'app/main/Domain/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ServicioCliente {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/clientes';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

    clientes: Cliente[] = [
    new Cliente(1001, 'Ana', 'Gómez', 'Calle 10 #20-30', '3101234567'),
    new Cliente(1002, 'Luis', 'Pérez', 'Avenida 5 #15-25', '3207654321'),
    new Cliente(1003, 'Sofía', 'Rodríguez', 'Carrera 7 #8-45', '3009876543'),
    new Cliente(1004, 'Javier', 'Díaz', 'Calle 25 #5-10', '3152345678'),
    new Cliente(1005, 'Marta', 'Sánchez', 'Avenida 30 #1-50', '3188765432'),
    new Cliente(1006, 'Carlos', 'López', 'Carrera 12 #100-20', '3015432109'),
    new Cliente(1007, 'Laura', 'Martínez', 'Calle 50 #65-10', '3221122334'),
    new Cliente(1008, 'Andrés', 'Hernández', 'Avenida 80 #3-75', '3139871234'),
    new Cliente(1009, 'Isabel', 'García', 'Carrera 9 #15-90', '3055678901'),
    new Cliente(1010, 'Diego', 'Torres', 'Calle 90 #45-10', '3167890123'),
    new Cliente(1011, 'Valeria', 'Ruiz', 'Avenida 15 #5-55', '3213456789'),
    new Cliente(1012, 'Pablo', 'Jiménez', 'Carrera 20 #12-30', '3049876543'),
    new Cliente(1013, 'Camila', 'Morales', 'Calle 70 #80-15', '3192345678'),
    new Cliente(1014, 'Ricardo', 'Castro', 'Avenida 6 #10-25', '3178765432'),
    new Cliente(1015, 'Gabriela', 'Ramírez', 'Carrera 5 #40-80', '3025432109'),
    new Cliente(1016, 'Daniel', 'Silva', 'Calle 30 #50-10', '3231122334'),
    new Cliente(1017, 'Natalia', 'Vargas', 'Avenida 45 #2-70', '3119871234'),
    new Cliente(1018, 'Felipe', 'Ortiz', 'Carrera 8 #15-60', '3035678901'),
    new Cliente(1019, 'Lucía', 'Guzmán', 'Calle 60 #20-50', '3147890123'),
    new Cliente(1020, 'Sergio', 'Herrera', 'Avenida 25 #3-35', '3253456789')
  ];

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/`)
      .pipe(
        tap(data => console.log('Fetched clientes:', data)),
        catchError(this.handleError)
      );
  }

  getById(cedula: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${cedula}`)
      .pipe(catchError(this.handleError));
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/`, cliente, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  update(cedula: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${cedula}`, cliente, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  delete(cedula: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${cedula}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = error.error instanceof ErrorEvent
      ? `Error: ${error.error.message}`
      : `Server error (${error.status}): ${error.message}`;
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
