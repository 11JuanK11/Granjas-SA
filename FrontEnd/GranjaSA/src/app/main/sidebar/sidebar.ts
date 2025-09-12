import { Component, computed, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MenuToggle } from '../Services/menu-toggle';
import { RouterLink } from '@angular/router';
import { ReportesService } from '../Services/ServicioPdf/reportes-service';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterOutlet, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit {

  servicioPdf = inject(ReportesService)
  @ViewChild('snav') snav!: MatSidenav;
  menuToggleService = inject(MenuToggle);

  collapsed = signal(true);
  sidenavWidth: string = '250px';
  profilePictureSize: string = '150px';
  showText: string = 'block'

  ngOnInit(): void {
    this.menuToggleService.toggle$.subscribe(() => {
      this.collapsedElements(this.collapsed());
    });
  }  

  private collapsedElements(collapsed: boolean) {
      if (collapsed) {
        this.collapsed.set(false);
        this.sidenavWidth = '65px';
        this.profilePictureSize = '50px';
        this.showText = 'none'
      }else{
        this.collapsed.set(true);
        this.profilePictureSize = '150px';
        this.sidenavWidth = '250px';
        this.showText = 'block'
      }

  }
  
  menuItems = signal<MenuItem[]>([
    {
      icon: 'person',
      label: 'Clientes',
      route: '/clientes'
    },
    {
      icon: 'agriculture',
      label: 'Porcinos',
      route: '/porcinos'
    }
  ]);

  crearReporte(){
    this.servicioPdf.generarPDF();
  }
}
