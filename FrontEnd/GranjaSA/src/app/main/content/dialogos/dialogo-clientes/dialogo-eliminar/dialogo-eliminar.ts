import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ServicioPorcino } from 'app/main/Services/ServicioPorcino/servicio-porcino';

@Component({
  selector: 'app-dialogo-eliminar-cliente',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialogo-eliminar.html',
  styleUrl: './dialogo-eliminar.scss'
})
export class DialogoEliminar {
  @Input() porcinoId: string = '';
  servicioPorcino = inject(ServicioPorcino);

  eliminarPorcino(porcinoId: string){
    console.log(`id del porcino a eliminar ${porcinoId}`);
    this.servicioPorcino.delete(porcinoId).subscribe({
        next: () => {
          console.log('Porcino eliminado', porcinoId);
        },
        error(err) {
            console.error(err);
        },
      });
  }

}
