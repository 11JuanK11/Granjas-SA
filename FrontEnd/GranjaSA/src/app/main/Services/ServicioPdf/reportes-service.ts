import { Injectable, inject } from '@angular/core';
import { Cliente } from 'app/main/Domain/Cliente';
import { Porcino } from 'app/main/Domain/Porcino';
import { ServicioCliente } from 'app/main/Services/ServicioCliente/servicio-cliente';

// Import pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private servicioCliente = inject(ServicioCliente);

  constructor() {}

  generarPDF() {
    this.servicioCliente.getAll().subscribe({
      next: (clientes: (Cliente & { porcinos?: Porcino[] })[]) => {
        const content: any[] = [];

        // Título principal
        content.push({ text: 'Reporte de Clientes y Porcinos', style: 'header', margin: [0, 0, 0, 15] , lineHeight: 2
});
        content.push({
          canvas: [
            {
              type: 'line',
              x1: 0, y1: 0,
              x2: 515, y2: 0, // ancho del PDF (~A4 = 515px)
              lineWidth: 1
            }
          ],
          margin: [0, 10, 0, 10]
        });


        clientes.forEach((cliente, index) => {
          // Cliente como lista
          content.push({ text: `Cliente ${index + 1}: ${cliente.nombres} ${cliente.apellidos}`, bold: true , lineHeight: 2
})
          content.push({
            ul: [
              `Cédula: ${cliente.cedula}`,
              `Dirección: ${cliente.direccion}`,
              `Teléfono: ${cliente.telefono}`,
              {
                ul: cliente.porcinos?.length
                  ? cliente.porcinos.map(
                      (porcino, idx) =>
                        `Cerdo ${idx + 1}: [ID: ${porcino.id}] ${porcino.raza}, Edad: ${porcino.edad} años, Peso: ${porcino.peso}kg, Alimentación: ${porcino.alimentacion.descripcion} (${porcino.alimentacion.dosis})`
                    )
                  : ['No tiene porcinos']
              }
            ],
            margin: [10, 5, 5, 10],
            lineHeight: 2});

          content.push({
            canvas: [
              {
                type: 'line',
                x1: 0, y1: 0,
                x2: 515, y2: 0, // ancho del PDF (~A4 = 515px)
                lineWidth: 1
              }
            ],
            margin: [0, 10, 0, 10]
          });

        });

        // Definición del documento
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
        console.error('Error obteniendo clientes:', err);
      }
    });
  }
}
