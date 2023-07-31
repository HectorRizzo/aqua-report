import { Component, OnInit } from '@angular/core';
import { AquaReportService } from 'app/services/aquaReport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usuario ;
  loading = false;
  hideNueva = true;
  hideActual = true;
  constructor(
    private aquaReportService: AquaReportService,
  ) { }

  ngOnInit() {
    this.usuario = this.aquaReportService.getUsuario();
    this.usuario.tipo = this.usuario.id_tipo_usuario;
  }

  actualizarUsuario(){
    this.loading = true;
    console.log(this.usuario);
    if(this.usuario.nombre == '' || this.usuario.apellido == '' || this.usuario.correo == ''){
      this.muestraMensaje('No puede dejar los datos personales vacío', 500);
      this.loading = false;
      return;
    }
    if(this.usuario.actualizarPassword){
      if(this.usuario.passwordActual == undefined || this.usuario.passwordActual == '' || this.usuario.passwordNueva == undefined || this.usuario.passwordNueva == ''){
        this.muestraMensaje('No puede dejar los datos de contraseña vacío', 500);
        this.loading = false;
        return;
      }
    
      if(this.usuario.passwordActual == this.usuario.passwordNueva){
        this.muestraMensaje('La contraseña nueva debe ser diferente a la actual', 500);
        this.loading = false;
        return;
      }

      this.aquaReportService.updatePerfil(this.usuario, this.usuario.id_usuario).subscribe((res: any) => {
        console.log(res);
        if(res.status == 200){
          let usuarioActualizado = {
            nombre: res.data.nombre,
            apellido: res.data.apellido,
            correo: res.data.correo,
            tipo: this.usuario.tipo,
            estado: this.usuario.estado,
            id_usuario: res.data.id_usuario,
            id_tipo_usuario: res.data.id_tipo_usuario,
          }
          this.aquaReportService.setUsuario(usuarioActualizado);
          this.muestraMensaje('Contraseña actualizada correctamente', 200);
          this.usuario = this.aquaReportService.getUsuario();
          this.clearPassword();
          this.loading = false;

        }else{
          this.muestraMensaje('Error al actualizar la contraseña', 500);
          this.loading = false;

        }
      }, (error) => {
        this.muestraMensaje(error.error.message, 500);
        this.loading = false;

      }
      );

    }
    else{
      this.aquaReportService.updateUsuario(this.usuario, this.usuario.id_usuario).subscribe((res: any) => {
      if(res.status == 200){
        let usuarioActualizado = {
          nombre: res.data.nombre,
          apellido: res.data.apellido,
          correo: res.data.correo,
          tipo: this.usuario.tipo,
          estado: this.usuario.estado,
          id_usuario: res.data.id_usuario,
          id_tipo_usuario: res.data.id_tipo_usuario,
        }
        this.aquaReportService.setUsuario(usuarioActualizado);
        this.muestraMensaje('Usuario actualizado correctamente', 200);
        this.usuario = this.aquaReportService.getUsuario();
        this.loading = false;
        this.clearPassword();

      }
      else{
        this.muestraMensaje('Error al actualizar el usuario', 500);
        this.loading = false;

      }
    }, (error) => {
      this.muestraMensaje(error.error.message, 500);
      this.loading = false;

    }

      );
    }
  }

  muestraMensaje(msg: string, code: string | number) {
    Swal.fire({
        // title: msg,
        text: msg,
        icon: code == 200 ? 'success' : 'error',
        // confirmButtonText: 'Cool'
      });
  }

  clearPassword(){
    this.usuario.actualizarPassword = false;
    this.usuario.passwordActual = '';
    this.usuario.passwordNueva = '';
  }

}
