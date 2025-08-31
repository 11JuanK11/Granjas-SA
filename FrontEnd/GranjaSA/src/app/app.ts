import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './main/topbar/topbar';
import { Sidebar } from './main/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Topbar, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('GranjaSA');
}
