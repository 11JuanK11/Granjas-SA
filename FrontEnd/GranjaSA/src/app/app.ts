import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './main/topbar/topbar';
import { Sidebar } from './main/sidebar/sidebar';
import { MainContent } from "./main/main-content/main-content";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Topbar, Sidebar, MainContent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('GranjaSA');
}
