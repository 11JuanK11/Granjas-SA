import { Component, Input, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Cliente } from 'app/main/Domain/Cliente';
import { Porcino } from 'app/main/Domain/Porcino';
import { RazaPorcino } from 'app/main/Domain/RazaPorcino';
import { ClienteServiceGraph } from 'app/main/GraphQL-Services/ServicioCliente/cliente-service-graph';
import { PorcinoServiceGraph } from 'app/main/GraphQL-Services/ServicioPorcino/porcino-service-graph';

@Component({
  selector: 'app-formulario-porcinos',
  imports: [ ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './formulario-porcinos.html',
  styleUrl: './formulario-porcinos.scss'
})
export class FormularioPorcinos implements OnInit {
  porcinoForm!: FormGroup;

  servicioPorcino = inject(PorcinoServiceGraph);
  servicioCliente = inject(ClienteServiceGraph);

  @Input() porcinoData: Porcino | null = null;

  razas: RazaPorcino[] = [];
  clientes: Cliente[] = [];

  nuevoPorcino: boolean = true;

  constructor(private fb: FormBuilder) {
    this.servicioCliente.getAll().subscribe({
      next: (clientes) => {
        console.log("Lista de clientes:", clientes);
        this.clientes = clientes;
      },
      error: (err) => console.error("Error:", err)
    });

    this.razas = Object.values(RazaPorcino);

  }

  ngOnInit(): void {
    this.porcinoForm = this.fb.group({
      id: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      peso: ['', [Validators.required, Validators.min(1)]],
      alimentacion: this.fb.group({
        descripcion: ['', Validators.required],
        dosis: ['', Validators.required]
      }),
      cliente: [null] // puede ser null
    });
    console.log("Datos del porcino recibidos en el formulario:", this.porcinoData);
    if (this.porcinoData) {
      this.nuevoPorcino = false;
      this.porcinoForm.patchValue({
        id: this.porcinoData.id,
        raza: this.porcinoData.raza,
        edad: this.porcinoData.edad,
        peso: this.porcinoData.peso,
        alimentacion: {
          descripcion: this.porcinoData.alimentacion.descripcion,
          dosis: this.porcinoData.alimentacion.dosis
        },
        cliente: this.porcinoData.cliente
      });
    }
  }

  onSubmit(): void {
    if (this.porcinoForm.valid) {
      const porcino: Porcino = this.porcinoForm.value;
      if(this.nuevoPorcino){
        this.servicioPorcino.create(porcino).subscribe({
          next: porcino => {
            console.log('Formulario enviado C:', porcino);
          },
          error(err) {
              console.error(err);
          },
        });
      }else{
        this.servicioPorcino.update(porcino).subscribe({
          next: porcino => {
            console.log('Formulario enviado A:', porcino);
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

  compareClientes(c1: Cliente, c2: Cliente): boolean {
    return c1 && c2 ? c1.cedula === c2.cedula : c1 === c2;
  }

}
