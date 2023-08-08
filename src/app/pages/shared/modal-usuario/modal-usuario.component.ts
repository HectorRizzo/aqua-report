import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AquaReportService } from 'app/services/aquaReport.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
    selector: 'app-modal-usuario',
    templateUrl: './modal-usuario.component.html',
    styleUrls: ['./modal-usuario.component.scss']
  })


export class ModalUsuarioComponent implements OnInit {
    @Input() usuario: any;
    @Output() resp: EventEmitter<any> = new EventEmitter();
    codigoRespuestaHttp;
    loading = false;
    mensaje = '';
    mostrarMensaje = false;
    tiposUsuario = [];
    tipoSeleccionado ;
    constructor(
    private activeModal: NgbActiveModal,
    private aquaReportService: AquaReportService,
    ) { }

    ngOnInit(): void {
        console.log(this.usuario);
        this.obtenerTiposUsuario();
        this.usuario.activo = this.usuario.estado == 'Activo' ? true : false;
    }

    actualizarUsuario(usuario) {
        this.loading = true;
        let body = {
            nombre: usuario.nombre,
            correo: usuario.correo,
            tipo: this.tipoSeleccionado.id,
            estado: usuario.activo ? 'A' : 'I',
        }
        this.aquaReportService.updateUsuario(body, usuario.id).subscribe((data: any) => {
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

    closeModal() {
        this.activeModal.close();
    }
    obtenerTiposUsuario(){
        this.aquaReportService.getTiposUsuario().subscribe((res:any) => {
            console.log(res);
            this.tiposUsuario = res.data;
            this.tipoSeleccionado = this.tiposUsuario.filter((item) => {
                return item.id == this.usuario.id_tipo_usuario;
            }
            )[0];
        }
        );
    }
    changeTipo(tipo){
        console.log(tipo);
        this.tipoSeleccionado = tipo;
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