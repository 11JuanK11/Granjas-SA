import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Cliente } from 'app/main/Domain/Cliente';
import { Porcino } from 'app/main/Domain/Porcino';
import { Alimentacion } from 'app/main/Domain/Alimentacion';
import { RazaPorcino } from 'app/main/Domain/RazaPorcino';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() {}

  importFromExcel(file: File): Promise<{
    porcinos: Porcino[];
    clientes: Cliente[];
    alimentaciones: Alimentacion[];
  }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // ---- Alimentaciones ----
          const wsAlimentacion = workbook.Sheets['Alimentacion'];
          const alimentacionRaw: any[] = XLSX.utils.sheet_to_json(wsAlimentacion);
          const alimentaciones: Alimentacion[] = alimentacionRaw.map(row =>
            new Alimentacion(row.id, row.descripcion, row.dosis)
          );

          // ---- Clientes ----
          const wsClientes = workbook.Sheets['Clientes'];
          const clientesRaw: any[] = XLSX.utils.sheet_to_json(wsClientes);
          const clientes: Cliente[] = clientesRaw.map(row =>
            new Cliente(row.cedula, row.nombres, row.apellidos, row.direccion, row.telefono)
          );

          // ---- Porcinos ----
          const wsPorcinos = workbook.Sheets['Porcinos'];
          const porcinosRaw: any[] = XLSX.utils.sheet_to_json(wsPorcinos);
          const porcinos: Porcino[] = porcinosRaw.map(row => {
            const alimentacion = alimentaciones.find(a => a.id === row.alimentacion);
            const cliente = clientes.find(c => c.cedula === row.cliente);

            return new Porcino(
              row.id,
              row.raza as RazaPorcino,  // casteo al enum
              row.edad,
              row.peso,
              alimentacion!,
              cliente ?? null
            );
          });

          resolve({ porcinos, clientes, alimentaciones });

        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = error => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
}
