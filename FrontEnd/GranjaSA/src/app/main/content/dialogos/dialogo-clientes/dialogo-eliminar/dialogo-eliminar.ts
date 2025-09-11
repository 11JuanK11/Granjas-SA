import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ServicioCliente } from 'app/main/Services/ServicioCliente/servicio-cliente';

@Component({
  selector: 'app-dialogo-eliminar-cliente',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialogo-eliminar.html',
  styleUrl: './dialogo-eliminar.scss'
})
export class DialogoEliminar {
  @Input() cedula: number = -1;
  servicioCliente = inject(ServicioCliente);

  eliminarCliente(cedula: number){
    console.log(`cedula a eliminar ${cedula}`);
    this.servicioCliente.delete(cedula).subscribe({
        next: () => {
          console.log('cliente eliminado', cedula);
        },
        error(err) {
            console.error(err);
        },
      });
  }

}
