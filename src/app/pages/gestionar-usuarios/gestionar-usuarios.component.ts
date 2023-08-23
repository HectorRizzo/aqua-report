import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AquaReportService } from 'app/services/aquaReport.service';
import { ModalUsuarioComponent } from '../shared/modal-usuario/modal-usuario.component';
import { ModalAgregarUsuarioUsuarioComponent } from '../shared/modal-agregar-usuario/modal-agregar-usuario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.css']
})
export class GestionarUsuariosComponent implements OnInit {

  cantidad = {}
  usuarios = [];
  
    dataView= [];
    

    usuarioBusqueda = '';

  constructor(
    private aquaReportService: AquaReportService,
    private modal : NgbModal,
  ) { }

  ngOnInit() {
    this.obtenerUsuarios();
    
  }

  buscarUsuario(){
    console.log(this.usuarioBusqueda);
    this.dataView = this.usuarios.filter((item) => {
      return item.nombre.toLowerCase().includes(this.usuarioBusqueda.toLowerCase());
    }
    );
  }

  obtenerUsuarios(){
    this.aquaReportService.getUsuarios().subscribe((data:any) => {
      data.forEach(element => {
        element.tipo = this.capitalizar(element.tipo);
        let est = element.estado == 'A' ? 'Activo' : 'Inactivo';
        element.estado = this.capitalizar(est);
        element.id = element.id;
        element.nombre = element.nombre;
        }
      );
      this.cantidad = {
        administradores: data.filter((item) => {
          return item.tipo == 'ADMIN';
        }
        ).length,
        usuarios: data.filter((item) => {
          return item.tipo == 'USUARIO';
        }
        ).length,
        mantenimiento: data.filter((item) => {
          return item.tipo == 'PERSONAL';
        }
        ).length,
        lectores: data.filter((item) => {
          return item.tipo == 'LECTOR';
        }
        ).length,
      }
      this.usuarios = data;
      this.dataView = data;
    });
  }


  capitalizar(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  abrirModalAgregarUsuario(){
    const modalMap = this.modal.open(ModalAgregarUsuarioUsuarioComponent, {
      size: 'md',
      backdrop: false
    });
    modalMap.componentInstance.usuario = {};
    modalMap.componentInstance.resp.subscribe((data) => {
      this.obtenerUsuarios();
    }
    );
  }
  
  abrirModalUsuario(usuario){  
    console.log(usuario);
    const modalMap = this.modal.open(ModalUsuarioComponent, {
      size: 'md',
      backdrop: false
    });
    modalMap.componentInstance.usuario = usuario;
    modalMap.componentInstance.resp.subscribe((data) => {
      this.obtenerUsuarios();
    }
    );
  }

  eliminarUsuario(usuario){
    console.log(usuario);
    Swal.fire({
      title: '¿Está seguro que desea eliminar el usuario?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      console.log(result);
      if (result.value) {
        this.aquaReportService.deleteUsuario(usuario.id).subscribe((data: any) => {
          Swal.fire(
            'Eliminado',
            'El usuario ha sido eliminado correctamente',
            'success'
          )
          this.obtenerUsuarios();
        }, (error) => {
          Swal.fire(
            'Error',
            'Ha ocurrido un error al eliminar el usuario',
            'error'
          )
        }
        );
      }
    })
  }

}
