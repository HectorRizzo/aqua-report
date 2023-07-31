import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Inicio',  icon: 'home', class: '' },
    { path:'/admin/reportes' , title: 'Administrar Reportes',  icon:'assignment', class: '' },
    { path: '/admin/medidores', title: 'Administrar Medidores',  icon:'speed', class: '' },
    { path: '/admin/usuarios', title: 'Gestionar Usuarios',  icon:'manage_accounts', class: '' },
    { path: '/admin/perfil', title: 'Perfil',  icon:'person', class: '' },
    { path: '/admin/cerrar-sesion', title: 'Cerrar Sesión',  icon:'logout', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
