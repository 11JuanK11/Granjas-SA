import { Component, Input, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Cliente } from 'app/main/Domain/Cliente';
import { ServicioCliente } from 'app/main/Services/ServicioCliente/servicio-cliente';

@Component({
  selector: 'app-formulario-clientes',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './formulario-clientes.html',
  styleUrl: './formulario-clientes.scss'
})
export class FormularioClientes implements OnInit {
  clienteForm!: FormGroup;
  servicioCliente = inject(ServicioCliente);
  @Input() clienteData: Cliente | null = null;
  nuevoCliente: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      cedula: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
    console.log("Datos del cliente recibidos en el formulario:", this.clienteData);
    if(this.clienteData){
      this.nuevoCliente = false;
      this.clienteForm.patchValue({
        cedula: this.clienteData.cedula,
        nombres: this.clienteData.nombres,
        apellidos: this.clienteData.apellidos,
        direccion: this.clienteData.direccion,
        telefono: this.clienteData.telefono
      });
    }
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.value;
      if(this.nuevoCliente){
        this.servicioCliente.create(cliente).subscribe({
          next: cliente => {
            console.log('Formulario enviado C:', cliente);
          },
          error(err) {
              console.error(err);
          },
        });
      }else{
        this.servicioCliente.update(cliente).subscribe({
          next: cliente => {
            console.log('Formulario enviado A:', cliente);
          },
          error(err) {
              console.error(err);
          },
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}

