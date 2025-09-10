import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
    imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',

})
export class Dashboard {
  private breakpointObserver = inject(BreakpointObserver);

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Clientes', cols: 1, rows: 1, content: 'contenido de clientes' },
          { title: 'Porcinos', cols: 1, rows: 1, content: 'contenido de porcinos' },
        ];
      }

      return [
        { title: 'Clientes', cols: 2, rows: 1, content: 'contenido de clientes' },
        { title: 'Porcinos', cols: 2, rows: 1, content: 'contenido de Porcinos'},
      ];
    })
  );
}
