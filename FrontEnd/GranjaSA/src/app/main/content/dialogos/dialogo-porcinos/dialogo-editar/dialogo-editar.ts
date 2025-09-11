import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormularioPorcinos } from 'app/main/content/formularios/formulario-porcinos/formulario-porcinos';
import { Porcino } from 'app/main/Domain/Porcino';

@Component({
  selector: 'app-dialogo-editar',
  imports: [MatButtonModule, MatDialogModule, FormularioPorcinos],
  templateUrl: './dialogo-editar.html',
  styleUrl: './dialogo-editar.scss'
})
export class DialogoEditar {
  porcinoData: Porcino | null = null;
  
  constructor(private dialogRef: MatDialogRef<DialogoEditar>) {}

  onPorcinoEditado(porcino: Porcino) {
    console.log('Porcino editado recibido en el diálogo:', porcino);
    this.dialogRef.close(porcino)
  }
}
  

