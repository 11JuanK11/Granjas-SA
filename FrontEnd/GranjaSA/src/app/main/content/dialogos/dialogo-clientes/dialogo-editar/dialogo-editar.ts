import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormularioClientes } from 'app/main/content/formularios/formulario-clientes/formulario-clientes';
import { Cliente } from 'app/main/Domain/Cliente';

@Component({
  selector: 'app-dialogo-editar-cliente',
  imports: [MatButtonModule, MatDialogModule, FormularioClientes],
  templateUrl: './dialogo-editar.html',
  styleUrl: './dialogo-editar.scss'
})
export class DialogoEditar {
  clienteData: Cliente | null = null;
  
  constructor(private dialogRef: MatDialogRef<DialogoEditar>) {}

  onPorcinoEditado(cliente: Cliente) {
    console.log('Porcino editado recibido en el diálogo:', cliente);
    this.dialogRef.close(cliente)
  }
}
  

