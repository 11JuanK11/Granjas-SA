import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Alimentacion } from 'app/main/Domain/Alimentacion';
@Injectable({
  providedIn: 'root'
})
export class ServicioAlimentacion {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/alimentaciones';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  getAll(): Observable<Alimentacion[]> {
    return this.http.get<Alimentacion[]>(`${this.baseUrl}/`)
      .pipe(
        tap(data => console.log('Fetched alimentaciones:', data)),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Alimentacion> {
    return this.http.get<Alimentacion>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(alimentacion: Alimentacion): Observable<Alimentacion> {
    return this.http.post<Alimentacion>(`${this.baseUrl}/`, alimentacion, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  update(id: number, alimentacion: Alimentacion): Observable<Alimentacion> {
    return this.http.put<Alimentacion>(`${this.baseUrl}/${id}`, alimentacion, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
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
