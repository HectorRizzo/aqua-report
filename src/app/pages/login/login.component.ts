import { Component, OnInit } from '@angular/core';
import { AquaReportService } from 'app/services/aquaReport.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    correo: string;
    password: string;
    loading = false;
    hide= true;
    constructor(
        private aquaReportService: AquaReportService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    login(){
        this.loading = true;
        let body = {
            correo: this.correo,
            password: this.password
        }

        this.aquaReportService.login(body).subscribe((res: any) => {
            this.loading = false;
            const usuario = {
                nombre: res.data.name,
                correo: res.data.email,
                tipo: res.data.tipo,
                estado: res.data.estado,
                id: res.data.id,
                id_tipo_usuario: res.data.id_tipo_usuario,
            }
            localStorage.setItem('usuarioAqua', JSON.stringify(usuario));
            this.muestraMensaje(res.message, res.status);
            this.router.navigateByUrl('/admin');


        }, (error) => {
            this.loading = false;
            this.muestraMensaje('Error al iniciar sesión, usuario/contraseña incorrecta', 500);
            console.log(error);
        }
        );


    }

    muestraMensaje(msg: string, code: string | number) {
        Swal.fire({
            // title: msg,
            text: msg,
            icon: code == 200 ? 'success' : 'error',
            // confirmButtonText: 'Cool'
          });
    }
}