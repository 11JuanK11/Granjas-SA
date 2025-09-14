import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-bienvenida',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './bienvenida.html',
  styleUrl: './bienvenida.scss'
})
export class Bienvenida {
  abrirImagen(url: string) {
    window.open(url, '_blank');
  }
}
