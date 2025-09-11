import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormularioPorcinos } from '../../../formularios/formulario-porcinos/formulario-porcinos';
import { Porcino } from 'app/main/Domain/Porcino';

@Component({
  selector: 'app-dialogo-ingresar-cliente',
  imports: [MatButtonModule, MatDialogModule, FormularioPorcinos],
  templateUrl: './dialogo-ingresar.html',
  styleUrl: './dialogo-ingresar.scss'
})
export class DialogoIngresar {
  porcinoData: Porcino | null = null;
  
  constructor(private dialogRef: MatDialogRef<DialogoIngresar>) {}

  onPorcinoEditado(porcino: Porcino) {
    console.log('Porcino editado recibido en el diálogo:', porcino);
    this.dialogRef.close(porcino)
  }
}
  

