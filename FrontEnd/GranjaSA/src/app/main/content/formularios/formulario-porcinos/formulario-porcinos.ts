import { Component, Input, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Cliente } from 'app/main/Domain/Cliente';
import { Porcino } from 'app/main/Domain/Porcino';
import { RazaPorcino } from 'app/main/Domain/RazaPorcino';
import { ServicioPorcino } from 'app/main/Services/ServicioPorcino/servicio-porcino';

@Component({
  selector: 'app-formulario-porcinos',
  imports: [ ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './formulario-porcinos.html',
  styleUrl: './formulario-porcinos.scss'
})
export class FormularioPorcinos implements OnInit {
  porcinoForm!: FormGroup;

  servicioPorcino = inject(ServicioPorcino);
  @Input() porcinoData: Porcino | null = null;

  razas = Object.values(RazaPorcino);

  clientes: Cliente[] = [
    new Cliente(1001, 'Ana', 'Gómez', 'Calle 10 #20-30', '3101234567'),
    new Cliente(1002, 'Luis', 'Pérez', 'Avenida 5 #15-25', '3207654321'),
    new Cliente(1003, 'Sofía', 'Rodríguez', 'Carrera 7 #8-45', '3009876543'),
    new Cliente(1004, 'Javier', 'Díaz', 'Calle 25 #5-10', '3152345678'),
    new Cliente(1005, 'Marta', 'Sánchez', 'Avenida 30 #1-50', '3188765432'),
    new Cliente(1006, 'Carlos', 'López', 'Carrera 12 #100-20', '3015432109'),
    new Cliente(1007, 'Laura', 'Martínez', 'Calle 50 #65-10', '3221122334'),
    new Cliente(1008, 'Andrés', 'Hernández', 'Avenida 80 #3-75', '3139871234'),
    new Cliente(1009, 'Isabel', 'García', 'Carrera 9 #15-90', '3055678901'),
    new Cliente(1010, 'Diego', 'Torres', 'Calle 90 #45-10', '3167890123'),
    new Cliente(1011, 'Valeria', 'Ruiz', 'Avenida 15 #5-55', '3213456789'),
    new Cliente(1012, 'Pablo', 'Jiménez', 'Carrera 20 #12-30', '3049876543'),
    new Cliente(1013, 'Camila', 'Morales', 'Calle 70 #80-15', '3192345678'),
    new Cliente(1014, 'Ricardo', 'Castro', 'Avenida 6 #10-25', '3178765432'),
    new Cliente(1015, 'Gabriela', 'Ramírez', 'Carrera 5 #40-80', '3025432109'),
    new Cliente(1016, 'Daniel', 'Silva', 'Calle 30 #50-10', '3231122334'),
    new Cliente(1017, 'Natalia', 'Vargas', 'Avenida 45 #2-70', '3119871234'),
    new Cliente(1018, 'Felipe', 'Ortiz', 'Carrera 8 #15-60', '3035678901'),
    new Cliente(1019, 'Lucía', 'Guzmán', 'Calle 60 #20-50', '3147890123'),
    new Cliente(1020, 'Sergio', 'Herrera', 'Avenida 25 #3-35', '3253456789')
  ];

  nuevoPorcino: boolean = true;

  constructor(private fb: FormBuilder) {}

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
        this.servicioPorcino.update(porcino.id, porcino).subscribe({
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
