import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Reporte } from 'app/main/Domain/Reporte';
import { environment } from 'enviroment.prod';

(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/reporte`;

  constructor() {}

  generarPDF() {
    this.getAll().subscribe({
      next: (reportes: Reporte[]) => {
        const content: any[] = [];

        content.push({
          text: 'Reporte de Clientes y Porcinos',
          style: 'header',
          margin: [0, 0, 0, 15],
          lineHeight: 2
        });

        content.push({
          canvas: [
            {
              type: 'line',
              x1: 0, y1: 0,
              x2: 515, y2: 0,
              lineWidth: 1
            }
          ],
          margin: [0, 10, 0, 10]
        });

        reportes.forEach((reporte, index) => {
          const cliente = reporte.cliente;
          const porcinos = reporte.porcinos;
          content.push({
            text: `Cliente ${index + 1}: ${cliente.nombres} ${cliente.apellidos}`,
            bold: true,
            lineHeight: 2
          });

          content.push({
            ul: [
              `Cédula: ${cliente.cedula}`,
              `Dirección: ${cliente.direccion}`,
              `Teléfono: ${cliente.telefono}`,
              {
                ul: porcinos?.length
                  ? porcinos.map(
                      (porcino, idx) =>
                        `Cerdo ${idx + 1}: [ID: ${porcino.id}] ${porcino.raza}, Edad: ${porcino.edad} años, Peso: ${porcino.peso}kg, Alimentación: ${porcino.alimentacion.descripcion} (${porcino.alimentacion.dosis})`
                    )
                  : ['No tiene porcinos']
              }
            ],
            margin: [10, 5, 5, 10],
            lineHeight: 2
          });

          content.push({
            canvas: [
              {
                type: 'line',
                x1: 0, y1: 0,
                x2: 515, y2: 0,
                lineWidth: 1
              }
            ],
            margin: [0, 10, 0, 10]
          });
        });

        const documentDefinition: any = {
          content: content,
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              alignment: 'center'
            }
          }
        };

        pdfMake.createPdf(documentDefinition).download('Reporte_Clientes.pdf');
      },
      error: err => {
        console.error('Error obteniendo reportes:', err);
      }
    });
  }

  private getAll(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.baseUrl}/`).pipe(
      tap(data => console.log('Fetched reportes (API):', data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error instanceof ErrorEvent
      ? `Error: ${error.error.message}`
      : `Server error (${error.status}): ${error.message}`;
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
