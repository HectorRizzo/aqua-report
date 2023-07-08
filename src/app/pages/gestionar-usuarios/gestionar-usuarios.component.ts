import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.css']
})
export class GestionarUsuariosComponent implements OnInit {

  cantidad = {}
  data = [
    {id: 1, nombres: 'Juan', apellidos: 'Perez', correo: 'juanperez@gmail.com', telefono: '987654321', tipo: 'Administrador', estado: 'Activo'},
    {id: 2, nombres: 'Lucio', apellidos: 'Alva', correo: 'lucioalva@gmail.com' , telefono: '987654321', tipo: 'Usuario', estado: 'Activo'},
    {id: 3, nombres: 'Andres', apellidos: 'Silva', correo: 'andressilva@gmail.com', telefono: '987654321', tipo: 'Mantenimiento', estado: 'Activo'},
    {id: 4, nombres: 'Emilio', apellidos: 'Pardo', correo: 'emiliopardo@gmail.com', telefono: '987654321', tipo: 'Mantenimiento', estado: 'Activo'},
    {id: 5, nombres: 'Luna', apellidos: 'Da Silva', correo: 'lunadasilva@gmail.com', telefono: '987654321', tipo: 'Mantenimiento', estado: 'Activo'},
    {id: 6, nombres: 'Jhon', apellidos: 'Doe', correo: 'jhondoe@gmail.com', telefono: '987654321', tipo: 'Lector', estado: 'Activo'},
    {id: 7, nombres: 'Leonardo', apellidos: 'Da Vinci', correo: 'leonardodavinci@gmail.com', telefono: '987654321', tipo: 'Lector', estado: 'Activo'},
    ];

    dataView= [];

    usuarioBusqueda = '';

  constructor() { }

  ngOnInit() {
    this.dataView = this.data;
    this.cantidad = {
      administradores: this.data.filter((item) => {
        return item.tipo == 'Administrador';
      }
      ).length,
      usuarios: this.data.filter((item) => {
        return item.tipo == 'Usuario';
      }
      ).length,
      mantenimiento: this.data.filter((item) => {
        return item.tipo == 'Mantenimiento';
      }
      ).length,
      lectores: this.data.filter((item) => {
        return item.tipo == 'Lector';
      }
      ).length,
    }
  }

  buscarUsuario(){
    console.log(this.usuarioBusqueda);
    this.dataView = this.data.filter((item) => {
      return item.nombres.toLowerCase().includes(this.usuarioBusqueda.toLowerCase()) || item.apellidos.toLowerCase().includes(this.usuarioBusqueda.toLowerCase());
    }
    );
  }

}
