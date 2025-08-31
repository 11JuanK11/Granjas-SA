import { Component, signal } from '@angular/core';
import { Topbar } from './main/topbar/topbar';
import { Sidebar } from './main/sidebar/sidebar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [Topbar, Sidebar, MatSidenavModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('GranjaSA');
  showFiller = false;

}
