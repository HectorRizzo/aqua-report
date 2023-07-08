import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-medidores',
  templateUrl: './administrar-medidores.component.html',
  styleUrls: ['./administrar-medidores.component.css']
})
export class AdministrarMedidoresComponent implements OnInit {
  data = [
    {id: 1, categoria:1, descripcion: 'Reporte 1', fechaUltimaLectura: '01/01/2020', ultimaLectura: '100', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Juan Perez', estado: 'Activo'},
    {id: 2, categoria:2, descripcion: 'Reporte 2', fechaUltimaLectura: '01/01/2020', ultimaLectura: '200', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Lucio Alva', estado: 'Activo'},
    {id: 3, categoria:3, descripcion: 'Reporte 3', fechaUltimaLectura: '01/01/2020', ultimaLectura: '300', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal :  'Andres Silva', estado: 'Activo'},
    {id: 4, categoria:1,descripcion: 'Reporte 4', fechaUltimaLectura: '01/01/2020', ultimaLectura: '400', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Emilio Pardo', estado: 'Activo'},
    {id: 5, categoria:2, descripcion: 'Reporte 5', fechaUltimaLectura: '01/01/2020', ultimaLectura: '500', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Luna Da Silva', estado: 'Activo'},
    {id: 6,categoria:3,  descripcion: 'Reporte 6', fechaUltimaLectura: '01/01/2020', ultimaLectura: '560', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Jhon Doe', estado: 'Activo'},
    {id: 7, categoria:1,descripcion: 'Reporte 7', fechaUltimaLectura: '01/01/2020', ultimaLectura: '670', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Leonardo Da Vinci', estado: 'Activo'},
    {id: 8, categoria:1, descripcion: 'Reporte 8', fechaUltimaLectura: '01/01/2020', ultimaLectura: '720', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Miguel Angel', estado: 'Activo'},
    {id: 9,categoria:1,  descripcion: 'Reporte 9', fechaUltimaLectura: '01/01/2020', ultimaLectura: '800', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Diego Maradona', estado: 'Activo'},
    {id: 10, categoria:1,descripcion: 'Reporte 10', fechaUltimaLectura: '01/01/2020', ultimaLectura: '110', fechaCreacion: '01/01/2019',fechaProximaLectura: '01/01/2018', personal : 'Hugo Quintana', estado: 'Activo'},
    {id: 11, categoria:1, descripcion: 'Reporte 11', fechaUltimaLectura: '01/01/2020', ultimaLectura: '113',fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Quentin Tarantino', estado: 'Activo'},
    {id: 12,categoria:3,  descripcion: 'Reporte 12', fechaUltimaLectura: '01/01/2020', ultimaLectura: '901',fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Zinedine Zidane', estado: 'Activo'}
  ];


  categoria = [
    {id: 1, nombre: 'Asignados'},
    {id: 2, nombre: 'Pendientes'},
    {id: 3, nombre: 'Creados'},
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
