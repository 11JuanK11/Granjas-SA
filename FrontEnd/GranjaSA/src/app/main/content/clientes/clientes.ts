import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Cliente} from '../../Domain/Cliente';
import { ServicioCliente } from 'app/main/Services/ServicioCliente/servicio-cliente';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogoIngresar } from '../dialogos/dialogo-clientes/dialogo-ingresar/dialogo-ingresar';
import { DialogoEditar } from '../dialogos/dialogo-clientes/dialogo-editar/dialogo-editar';
import { DialogoEliminar } from '../dialogos/dialogo-clientes/dialogo-eliminar/dialogo-eliminar';
import { ServicioPorcino } from 'app/main/Services/ServicioPorcino/servicio-porcino';


@Component({
  selector: 'app-clientes',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss'
})
export class Clientes implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Cedula', 'Nombres', 'Apellidos', 'Direccion', 'Telefono', 'Acciones'];
  dataSource: MatTableDataSource<Cliente>;
  servicioCliente = inject(ServicioCliente);
  servicioPorcino = inject(ServicioPorcino)
  readonly dialog = inject(MatDialog);
  clientes: Cliente[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.servicioCliente.getAll().subscribe({
      next: (clientes) => {
        console.log("Lista de clientes:", clientes);
        this.clientes = clientes;
      },
      error: (err) => console.error("Error:", err)
    });

    this.dataSource = new MatTableDataSource(this.clientes);
  }

    ngOnInit() {
      this.servicioCliente.getAll().subscribe(data => {
        this.clientes = data;
        this.dataSource.data = [...this.clientes];
      });

      this.servicioCliente.cliente$.subscribe(event => {
        if (event.cliente) {
          const index = this.clientes.findIndex(p => p.cedula === event.cliente!.cedula);
          if (index !== -1) this.clientes[index] = event.cliente!;
          else this.clientes.push(event.cliente!);
        } else if (event.deletedCedula) {
          this.clientes = this.clientes.filter(p => p.cedula !== event.deletedCedula);
        }
        this.dataSource.data = [...this.clientes];
      });

      this.servicioPorcino.porcino$.subscribe(event => {
        if(event.porcinos){
          this.servicioCliente.getAll().subscribe(data => {
            this.clientes = data;
            this.dataSource.data = [...this.clientes];
          });
        }
      });
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Cedula': return item.cedula;
        case 'Nombres': return item.nombres;
        case 'Apellidos': return item.apellidos;
        case 'Direccion': return item.direccion;
        case 'Telefono': return item.telefono;
        default: return (item as any)[property];
      }
  };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    abrirAgregar() {
      const dialogRef = this.dialog.open(DialogoIngresar);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  
    abrirEditar(cedula: number) {
      const dialogRef = this.dialog.open(DialogoEditar);
      console.log("cedula clientes:", cedula)
      dialogRef.componentInstance.clienteData = this.clientes.filter(c => c.cedula === cedula)[0];
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  
    abrirEliminar(cedula: number) {
      const dialogRef = this.dialog.open(DialogoEliminar);
  
      dialogRef.componentInstance.cedula = cedula;
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
}


