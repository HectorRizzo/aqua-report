import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
    selector: 'cerrar-sesion',
    templateUrl: './cerrar-sesion.component.html',
    styleUrls: ['./cerrar-sesion.component.css']
  })
  export class CerrarSesionComponent implements OnInit {
    constructor() { }
    ngOnInit() {
        Swal.fire({
            title: '¿Desea cerrar sesión?',
            text: "Se cerrará la sesión actual",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
            }).then((result) => {
            if (result.value) {
                sessionStorage.removeItem('usuarioAqua');
                window.location.href = '/login';
            }
            }
        )
        
    }
  }