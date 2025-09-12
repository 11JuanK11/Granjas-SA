import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Cliente } from 'app/main/Domain/Cliente';
import { ClienteEvent } from 'app/main/Domain/ClienteEvent';
import { Porcino } from 'app/main/Domain/Porcino';
import { RazaPorcino } from 'app/main/Domain/RazaPorcino';
import { Alimentacion } from 'app/main/Domain/Alimentacion';

@Injectable({
  providedIn: 'root'
})
export class ServicioCliente {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/cliente';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  private useMock = false;

  private clienteSubject = new Subject<ClienteEvent>();
  cliente$ = this.clienteSubject.asObservable();

clientesEjem: Cliente[] = [
  new Cliente(
    1001,
    "Ana",
    "Gómez",
    "Calle 10 #20-30",
    "3101234567",
    [
      new Porcino(
        "P-001",
        RazaPorcino.YORK,
        2,
        120,
        new Alimentacion(1, "Concentrado Premium", "2kg/día"),
        null // luego puedes asignar cliente si necesitas referencia inversa
      ),
      new Porcino(
        "P-002",
        RazaPorcino.DUROC,
        1,
        95,
        new Alimentacion(2, "Maíz y soya", "3kg/día"),
        null
      )
    ]
  ),
  new Cliente(
    1002,
    "Luis",
    "Pérez",
    "Avenida 5 #15-25",
    "3207654321",
    [
      new Porcino(
        "P-003",
        RazaPorcino.HAMP,
        3,
        150,
        new Alimentacion(3, "Balanceado porcino", "2.5kg/día"),
        null
      )
    ]
  ),
  new Cliente(
    1003,
    "Sofía",
    "Rodríguez",
    "Carrera 7 #8-45",
    "3009876543",
    []
  )
];

  // ===================== GET ALL ===================== bien
  getAll(): Observable<Cliente[]> {
    if (this.useMock) {
      return of(this.clientesEjem).pipe(
        delay(300),
        tap(data => console.log('Fetched clientes (mock):', data))
      );
    } else {
      return this.http.get<Cliente[]>(`${this.baseUrl}/`).pipe(
        tap(data => console.log('Fetched clientes (API):', data)),
        catchError(this.handleError)
      );
    }
  }

  // ===================== GET BY ID ===================== no necesario
  getById(cedula: number): Observable<Cliente> {
    if (this.useMock) {
      const cliente = this.clientesEjem.find(c => c.cedula === cedula);
      return cliente ? of(cliente) : throwError(() => new Error('Cliente no encontrado'));
    } else {
      return this.http.get<Cliente>(`${this.baseUrl}/${cedula}`).pipe(
        catchError(this.handleError)
      );
    }
  }

  // ===================== CREATE ===================== bien
  create(cliente: Cliente): Observable<Cliente> {
    if (this.useMock) {
      this.clientesEjem.push(cliente);
      console.log(this.clientesEjem)
      this.clienteSubject.next({ cliente }); // notifica creación
      return of(cliente);
    } else {
      return this.http.post<Cliente>(`${this.baseUrl}/`, cliente, { headers: this.headers }).pipe(
        tap(newCliente => this.clienteSubject.next({ cliente: newCliente })),
        catchError(this.handleError)
      );
    }
  }

  // ===================== UPDATE ===================== bien
  update(cliente: Cliente): Observable<Cliente> { 
    if (this.useMock) {
      this.clienteSubject.next({ cliente }); // notifica actualización
      return of(cliente);
    } else {
      return this.http.put<Cliente>(`${this.baseUrl}/`, cliente, { headers: this.headers }).pipe(
        tap(updated => this.clienteSubject.next({ cliente: updated })),
        catchError(this.handleError)
      );
    }
  }

  // ===================== DELETE ===================== bien
  delete(cedula: number): Observable<void> {
    if (this.useMock) {
      this.clientesEjem = this.clientesEjem.filter(c => c.cedula !== cedula);
      this.clienteSubject.next({ deletedCedula: cedula }); // notifica eliminación
      return of(void 0);
    } else {
      return this.http.delete<void>(`${this.baseUrl}/${cedula}`).pipe(
        tap(() => this.clienteSubject.next({ deletedCedula: cedula })),
        catchError(this.handleError)
      );
    }
  }

  // ===================== ERROR HANDLER =====================
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error instanceof ErrorEvent
      ? `Error: ${error.error.message}`
      : `Server error (${error.status}): ${error.message}`;
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
