import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AquaReportService } from 'app/services/aquaReport.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
    selector: 'app-modal-agregar-usuario',
    templateUrl: './modal-agregar-usuario.component.html',
    styleUrls: ['./modal-agregar-usuario.component.scss']
  })


export class ModalAgregarUsuarioUsuarioComponent implements OnInit {
    usuario: any;
    @Output() resp: EventEmitter<any> = new EventEmitter();
    codigoRespuestaHttp;
    loading = false;
    mensaje = '';
    hide = true;
    checked = false;
    mostrarMensaje = false;
    tiposUsuario = [];
    tipoSeleccionado ;
    constructor(
    private activeModal: NgbActiveModal,
    private aquaReportService: AquaReportService,
    ) { }

    ngOnInit(): void {
        this.obtenerTiposUsuario();
    }

    crearUsuario(usuario) {
        console.log(usuario);
        this.loading = true;
        if(usuario.nombre == '' || usuario.nombre ==undefined || usuario.apellido == '' || usuario.apellido==undefined || usuario.correo == '' || usuario.correo == undefined || this.tipoSeleccionado == undefined){
            this.muestraMensaje('Debe llenar todos los campos', 500);
            this.loading = false;
            return;
        }
        let body = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            tipo: this.tipoSeleccionado.id,
            estado: usuario.activo == true ? 'A' : 'I',
        }
        console.log(body);

        this.aquaReportService.postUsuario(body).subscribe((data: any) => {
            console.log(data);
            this.loading = false;
            this.muestraMensaje('Usuario actualizado correctamente', 200);
            this.closeModal();
            this.resp.emit();
        }, (error) => {
            this.loading = false;
            this.muestraMensaje('Error al actualizar el usuario', 500);
        }
        );
        this.mensaje = 'Usuario actualizado correctamente';
        this.loading = false;
        this.closeModal();
        this.resp.emit();
    }

    obtenerTiposUsuario(){
        this.aquaReportService.getTiposUsuario().subscribe((res:any) => {
            console.log(res);
            this.tiposUsuario = res.data;
        }
        );
    }
    changeTipo(tipo){
        console.log(tipo);
        this.tipoSeleccionado = tipo;
    }

    cancelar() {
        this.closeModal();
    }

    closeModal() {
        this.activeModal.close();
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