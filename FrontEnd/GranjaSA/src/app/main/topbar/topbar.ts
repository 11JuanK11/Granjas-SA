import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuToggle } from '../Services/menu-toggle';
import { RouterLink } from "@angular/router";
import { ExcelService } from '../Services/ServicioExcel/excel-service';
import { Alimentacion } from '../Domain/Alimentacion';
import { Cliente } from '../Domain/Cliente';
import { Porcino } from '../Domain/Porcino';
import { ServicioPorcino } from '../Services/ServicioPorcino/servicio-porcino';

@Component({
  selector: 'app-topbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, RouterLink],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class Topbar {
  private menuToggleService = inject(MenuToggle);
  private servicoExcel = inject(ExcelService);
  private servicioPorcino = inject(ServicioPorcino);

  onMenuToggle(): void {
    this.menuToggleService.toggleMenu();
  }

  importar(event: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      console.error('No se seleccionó ningún archivo');
      return;
    }
    const file = input.files[0];
    this.servicoExcel.importFromExcel(file).then(data => {
      console.log('Datos importados:', data.porcinos);
      this.servicioPorcino.createPorcinos(data.porcinos).subscribe({
        next: resp => console.log('Respuesta:', resp),
        error: err => console.error('Error:', err)
      });

    }).catch(err => {
      console.error('Error al importar Excel:', err);
    });
    input.value = '';
  }
}
