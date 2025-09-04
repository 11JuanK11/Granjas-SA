import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Porcino} from '../../Domain/Porcino';
import {Cliente} from '../../Domain/Cliente';
import {RazaPorcino} from '../../Domain/RazaPorcino';
import {Alimentacion} from '../../Domain/Alimentacion';



@Component({
  selector: 'app-porcinos',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './porcinos.html',
  styleUrl: './porcinos.scss'
})
export class Porcinos implements AfterViewInit {
    displayedColumns: string[] = ['Identificador', 'Raza', 'Edad', 'Peso', 'Alimentacion', 'Cliente'];
  dataSource: MatTableDataSource<Porcino>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const porcinos = this.porcinos;

    this.dataSource = new MatTableDataSource(porcinos);
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

  porcinos: Porcino[] = [
    new Porcino(1, RazaPorcino.YORK, 6, 80, new Alimentacion(1, 'Dieta de engorde', '2kg/día'), undefined),
    new Porcino(2, RazaPorcino.HAMP, 5, 75, new Alimentacion(2, 'Dieta de crecimiento', '1.5kg/día'), undefined),
    new Porcino(3, RazaPorcino.DUROC, 8, 90, new Alimentacion(3, 'Dieta de mantenimiento', '1.8kg/día'), undefined),
    new Porcino(4, RazaPorcino.YORK, 7, 85, new Alimentacion(1, 'Dieta de engorde', '2.2kg/día'), undefined),
    new Porcino(5, RazaPorcino.HAMP, 4, 70, new Alimentacion(2, 'Dieta de crecimiento', '1.4kg/día'), undefined),
    new Porcino(6, RazaPorcino.DUROC, 9, 95, new Alimentacion(3, 'Dieta de mantenimiento', '2kg/día'), undefined),
    new Porcino(7, RazaPorcino.YORK, 5, 78, new Alimentacion(1, 'Dieta de engorde', '1.9kg/día'), undefined),
    new Porcino(8, RazaPorcino.HAMP, 6, 82, new Alimentacion(2, 'Dieta de crecimiento', '1.6kg/día'), undefined),
    new Porcino(9, RazaPorcino.DUROC, 7, 88, new Alimentacion(3, 'Dieta de mantenimiento', '1.7kg/día'), undefined),
    new Porcino(10, RazaPorcino.YORK, 8, 92, new Alimentacion(1, 'Dieta de engorde', '2.1kg/día'), undefined),
    new Porcino(11, RazaPorcino.HAMP, 5, 76, new Alimentacion(2, 'Dieta de crecimiento', '1.5kg/día'), undefined),
    new Porcino(12, RazaPorcino.DUROC, 6, 83, new Alimentacion(3, 'Dieta de mantenimiento', '1.6kg/día'), undefined),
    new Porcino(13, RazaPorcino.YORK, 9, 94, new Alimentacion(1, 'Dieta de engorde', '2.3kg/día'), undefined),
    new Porcino(14, RazaPorcino.HAMP, 7, 86, new Alimentacion(2, 'Dieta de crecimiento', '1.7kg/día'), undefined),
    new Porcino(15, RazaPorcino.DUROC, 4, 68, new Alimentacion(3, 'Dieta de mantenimiento', '1.4kg/día'), undefined),
    new Porcino(16, RazaPorcino.YORK, 6, 81, new Alimentacion(1, 'Dieta de engorde', '2kg/día'), undefined),
    new Porcino(17, RazaPorcino.HAMP, 8, 89, new Alimentacion(2, 'Dieta de crecimiento', '1.8kg/día'), undefined),
    new Porcino(18, RazaPorcino.DUROC, 5, 74, new Alimentacion(3, 'Dieta de mantenimiento', '1.5kg/día'), undefined),
    new Porcino(19, RazaPorcino.YORK, 7, 87, new Alimentacion(1, 'Dieta de engorde', '2.1kg/día'), undefined),
    new Porcino(20, RazaPorcino.HAMP, 9, 93, new Alimentacion(2, 'Dieta de crecimiento', '1.9kg/día'), undefined)
];
  
  
}
