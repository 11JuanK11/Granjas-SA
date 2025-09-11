import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'app/main/Domain/Cliente';
import { FormularioClientes } from 'app/main/content/formularios/formulario-clientes/formulario-clientes';

@Component({
  selector: 'app-dialogo-ingresar-cliente',
  imports: [MatButtonModule, MatDialogModule, FormularioClientes],
  templateUrl: './dialogo-ingresar.html',
  styleUrl: './dialogo-ingresar.scss'
})
export class DialogoIngresar {
  clienteData: Cliente | null = null;
  
  constructor(private dialogRef: MatDialogRef<DialogoIngresar>) {}

  onClienteEditado(Cliente: Cliente) {
    console.log('Cliente editado recibido en el diálogo:', Cliente);
    this.dialogRef.close(Cliente)
  }
}
  

