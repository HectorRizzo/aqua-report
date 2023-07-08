import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-reportes',
  templateUrl: './administrar-reportes.component.html',
  styleUrls: ['./administrar-reportes.component.css']
})
export class AdministrarReportesComponent implements OnInit {

  data = [
    {id: 1, categoria:1, descripcion: 'Reporte 1', ubicacion: 'ubicacion 1', prioridad: 'Alta', estado: 'Pendiente', fechaCreacion: '01/01/2020'},
    {id: 2, categoria:2, descripcion: 'Reporte 2', ubicacion: 'ubicacion 2', prioridad: 'Media', estado: 'Pendiente', fechaCreacion: '01/01/2020'},
    {id: 3, categoria:3, descripcion: 'Reporte 3', ubicacion: 'ubicacion 3', prioridad: 'Baja', estado: 'Pendiente', fechaCreacion: '01/01/2020'},
    {id: 4, categoria:1,descripcion: 'Reporte 4', ubicacion: 'ubicacion 4', prioridad: 'Alta', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 5, categoria:2, descripcion: 'Reporte 5', ubicacion: 'ubicacion 5', prioridad: 'Media', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 6,categoria:3,  descripcion: 'Reporte 6', ubicacion: 'ubicacion 6', prioridad: 'Baja', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 4, categoria:1,descripcion: 'Reporte 4', ubicacion: 'ubicacion 4', prioridad: 'Alta', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 5, categoria:1, descripcion: 'Reporte 5', ubicacion: 'ubicacion 5', prioridad: 'Media', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 6,categoria:1,  descripcion: 'Reporte 6', ubicacion: 'ubicacion 6', prioridad: 'Baja', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 4, categoria:1,descripcion: 'Reporte 4', ubicacion: 'ubicacion 4', prioridad: 'Alta', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 5, categoria:1, descripcion: 'Reporte 5', ubicacion: 'ubicacion 5', prioridad: 'Media', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 6,categoria:3,  descripcion: 'Reporte 6', ubicacion: 'ubicacion 6', prioridad: 'Baja', estado: 'Creado', fechaCreacion: '01/02/2019'}
  ];

  categoria = [
    {id: 1, nombre: 'Asignados'},
    {id: 2, nombre: 'No Asignados'},
    {id: 3, nombre: 'Finalizados'},
  ];

  categoriaSeleccionada;
  constructor() { }

  ngOnInit() {
    this.categoriaSeleccionada = this.categoria[0];
  }

  changeCategoria(event){
    console.log(event);
    this.categoriaSeleccionada = event;
  }

}
