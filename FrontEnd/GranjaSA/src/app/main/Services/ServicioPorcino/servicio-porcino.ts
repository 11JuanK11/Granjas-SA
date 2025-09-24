import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Alimentacion } from 'app/main/Domain/Alimentacion';
import { Cliente } from 'app/main/Domain/Cliente';
import { Porcino } from 'app/main/Domain/Porcino';
import { PorcinoEvent } from 'app/main/Domain/PorcinoEvent';
import { RazaPorcino } from 'app/main/Domain/RazaPorcino';
import { environment } from 'enviroment.prod';
import { catchError, delay, Observable, of, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioPorcino {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/porcino`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private useMock = false;

  private porcinoSubject = new Subject<PorcinoEvent>();
  porcino$ = this.porcinoSubject.asObservable();


    porcinosEjem: Porcino[] = [
    new Porcino('A1', RazaPorcino.YORK, 6, 80, new Alimentacion(1, 'Dieta de engorde', '2kg/día'), null),
    new Porcino('B2', RazaPorcino.HAMP, 5, 75, new Alimentacion(2, 'Dieta de crecimiento', '1.5kg/día'), new Cliente(1001, 'Ana', 'Gómez', 'Calle 10 #20-30', '3101234567')),
    new Porcino('C3', RazaPorcino.DUROC, 8, 90, new Alimentacion(3, 'Dieta de mantenimiento', '1.8kg/día'), undefined),
    new Porcino('D4', RazaPorcino.YORK, 7, 85, new Alimentacion(1, 'Dieta de engorde', '2.2kg/día'), undefined),
    new Porcino('F5', RazaPorcino.HAMP, 4, 70, new Alimentacion(2, 'Dieta de crecimiento', '1.4kg/día'), undefined),
    new Porcino('C6', RazaPorcino.DUROC, 9, 95, new Alimentacion(3, 'Dieta de mantenimiento', '2kg/día'), undefined),
    new Porcino('C7', RazaPorcino.YORK, 5, 78, new Alimentacion(1, 'Dieta de engorde', '1.9kg/día'), undefined),
    new Porcino('S8', RazaPorcino.HAMP, 6, 82, new Alimentacion(2, 'Dieta de crecimiento', '1.6kg/día'), undefined),
    new Porcino('Q9', RazaPorcino.DUROC, 7, 88, new Alimentacion(3, 'Dieta de mantenimiento', '1.7kg/día'), undefined),
    new Porcino('W10', RazaPorcino.YORK, 8, 92, new Alimentacion(1, 'Dieta de engorde', '2.1kg/día'), undefined),
    new Porcino('R11', RazaPorcino.HAMP, 5, 76, new Alimentacion(2, 'Dieta de crecimiento', '1.5kg/día'), undefined),
    new Porcino('T12', RazaPorcino.DUROC, 6, 83, new Alimentacion(3, 'Dieta de mantenimiento', '1.6kg/día'), undefined),
    new Porcino('Y13', RazaPorcino.YORK, 9, 94, new Alimentacion(1, 'Dieta de engorde', '2.3kg/día'), undefined),
    new Porcino('F14', RazaPorcino.HAMP, 7, 86, new Alimentacion(2, 'Dieta de crecimiento', '1.7kg/día'), undefined),
    new Porcino('G15', RazaPorcino.DUROC, 4, 68, new Alimentacion(3, 'Dieta de mantenimiento', '1.4kg/día'), undefined),
    new Porcino('H16', RazaPorcino.YORK, 6, 81, new Alimentacion(1, 'Dieta de engorde', '2kg/día'), undefined),
    new Porcino('I17', RazaPorcino.HAMP, 8, 89, new Alimentacion(2, 'Dieta de crecimiento', '1.8kg/día'), undefined),
    new Porcino('K18', RazaPorcino.DUROC, 5, 74, new Alimentacion(3, 'Dieta de mantenimiento', '1.5kg/día'), undefined),
    new Porcino('J19', RazaPorcino.YORK, 7, 87, new Alimentacion(1, 'Dieta de engorde', '2.1kg/día'), undefined),
    new Porcino('M20', RazaPorcino.HAMP, 9, 93, new Alimentacion(2, 'Dieta de crecimiento', '1.9kg/día'), undefined)
];

// funciona
  getAll(): Observable<Porcino[]> {
    if (this.useMock) {
      return of(this.porcinosEjem).pipe(
        delay(300),
        tap(data => console.log('Fetched porcinos (mock):', data))
      );
    } else {
      return this.http.get<Porcino[]>(`${this.baseUrl}/`).pipe(
        tap(data => console.log('Fetched porcinos (API):', data)),
        catchError(this.handleError)
      );
    }
  }

  // ===================== GET BY ID =====================
  getById(id: string): Observable<Porcino> {
    if (this.useMock) {
      const porcino = this.porcinosEjem.find(p => p.id === id);
      return porcino ? of(porcino) : throwError(() => new Error('Porcino no encontrado'));
    } else {
      return this.http.get<Porcino>(`${this.baseUrl}/${id}`).pipe(
        catchError(this.handleError)
      );
    }
  }

  //funciona
create(porcino: Porcino): Observable<Porcino> {
  if (this.useMock) {
    this.porcinosEjem.push(porcino);
    this.porcinoSubject.next({ porcino }); // notifica creación
    return of(porcino);
  } else {
    return this.http.post<Porcino>(`${this.baseUrl}/`, porcino, { headers: this.headers })
      .pipe(
        tap(newPorcino => this.porcinoSubject.next({ porcino: newPorcino })),
        catchError(this.handleError)
      );
  }
}

createPorcinos(porcinos: Porcino[]): Observable<Porcino[]> {
  if (this.useMock) {
    this.porcinosEjem = this.porcinosEjem.concat(porcinos);
    console.log(this.porcinosEjem);
    this.porcinoSubject.next({ porcinos }); // notifica creación múltiple
    return of(porcinos);
  } else {
      const porcinosPayload = porcinos.map(p => ({
        id: p.id,
        raza: p.raza,
        edad: p.edad,
        peso: p.peso,
        alimentacion: {
          id: p.alimentacion.id,
          descripcion: p.alimentacion.descripcion,
          dosis: p.alimentacion.dosis
        },
        cliente: p.cliente ? {
          cedula: p.cliente.cedula,
          nombres: p.cliente.nombres,
          apellidos: p.cliente.apellidos,
          direccion: p.cliente.direccion,
          telefono: p.cliente.telefono,
        }: null
      }));
    console.log('Payload enviado:', JSON.stringify(porcinos, null, 2));

    return this.http.post<Porcino[]>(`${this.baseUrl}/lista`, porcinos, { headers: this.headers })
      .pipe(
        tap(newPorcinos => this.porcinoSubject.next({ porcinos: newPorcinos })), 
        catchError(this.handleError)
      );
  }
}

//funciona
update(porcino: Porcino): Observable<Porcino> {
  if (this.useMock) {
    this.porcinoSubject.next({ porcino }); // notifica actualización
    return of(porcino);
  } else {
    return this.http.put<Porcino>(`${this.baseUrl}/`, porcino, { headers: this.headers })
      .pipe(
        tap(updated => this.porcinoSubject.next({ porcino: updated })),
        catchError(this.handleError)
      );
  }
}

  // ===================== DELETE ===================== funciona
  delete(id: string): Observable<void> {
    if (this.useMock) {
      this.porcinosEjem = this.porcinosEjem.filter(p => p.id !== id);
      this.porcinoSubject.next({ deletedId: id }); // notifica eliminación
      return of(void 0);
    } else {
      return this.http.delete<void>(`${this.baseUrl}/${id}`)
        .pipe(
          tap(() => this.porcinoSubject.next({ deletedId: id })),
          catchError(this.handleError)
        );
    }
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = error.error instanceof ErrorEvent
      ? `Error: ${error.error.message}`
      : `Server error (${error.status}): ${error.message}`;
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}


  
  
