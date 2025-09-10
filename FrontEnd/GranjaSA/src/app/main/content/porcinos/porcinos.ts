import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Porcino} from '../../Domain/Porcino';
import {Cliente} from '../../Domain/Cliente';
import {RazaPorcino} from '../../Domain/RazaPorcino';
import {Alimentacion} from '../../Domain/Alimentacion';
import { ServicioPorcino } from 'app/main/Services/ServicioPorcino/servicio-porcino';
import { catchError, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogoEditar } from '../dialogos/dialogo-editar/dialogo-editar';
import { DialogoEliminar } from '../dialogos/dialogo-eliminar/dialogo-eliminar';
import { DialogoIngresar } from '../dialogos/dialogo-ingresar/dialogo-ingresar';



@Component({
  selector: 'app-porcinos',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule],
  templateUrl: './porcinos.html',
  styleUrl: './porcinos.scss'
})
export class Porcinos implements OnInit, AfterViewInit{
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['Identificador', 'Raza', 'Edad', 'Peso', 'Alimentacion', 'Cliente', 'Acciones'];
  dataSource: MatTableDataSource<Porcino>;
  servicioPorcino = inject(ServicioPorcino);
  porcinos: Porcino[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.servicioPorcino.getAll().subscribe({
      next: (porcinos) => {
        this.porcinos = porcinos.map(p => ({
          ...p,
            cliente: p.cliente ?? {
            cedula: 0,
            nombres: "Por definir",
            apellidos: "",
            direccion: "",
            telefono: ""
          }
      }));
      },
      error: (err) => console.error("Error:", err)
    });
    console.log("Lista de porcinos:", this.porcinos);

    this.dataSource = new MatTableDataSource(this.porcinos);  
  }

    ngOnInit() {
      this.servicioPorcino.getAll().subscribe(data => {
      this.porcinos = data;
      this.dataSource.data = [...this.porcinos];
    });

  this.servicioPorcino.porcino$.subscribe(event => {
    if (event.porcino) {
      const index = this.porcinos.findIndex(p => p.id === event.porcino!.id);
      if (index !== -1) this.porcinos[index] = event.porcino!;
      else this.porcinos.push(event.porcino!);
    } else if (event.deletedId) {
      this.porcinos = this.porcinos.filter(p => p.id !== event.deletedId);
    }

    this.dataSource.data = [...this.porcinos];
  });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Identificador': return item.id;
        case 'Raza': return item.raza;
        case 'Edad': return item.edad;
        case 'Peso': return item.peso;
        case 'Alimentacion': return item.alimentacion.descripcion;
        case 'Cliente': return item.cliente ? item.cliente.nombres : '';
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

  abrirEditar(porcinoId: string) {
    const dialogRef = this.dialog.open(DialogoEditar);

    dialogRef.componentInstance.porcinoData = this.porcinos.filter(p => p.id === porcinoId)[0];
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  abrirEliminar(porcinoId: string) {
    const dialogRef = this.dialog.open(DialogoEliminar);

    dialogRef.componentInstance.porcinoId = porcinoId;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
