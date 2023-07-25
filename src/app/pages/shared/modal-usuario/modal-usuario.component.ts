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
    constructor(
    private activeModal: NgbActiveModal,
    private aquaReportService: AquaReportService,
    ) { }

    ngOnInit(): void {
    }

    actualizarUsuario(usuario) {
        this.loading = true;
        let body = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            tipo: usuario.tipo == 'ADMINISTRADOR' ? 3 : usuario.tipo == 'USUARIO' ? 1 : 2,
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

    muestraMensaje(msg: string, code: string | number) {
        Swal.fire({
            // title: msg,
            text: msg,
            icon: code == 200 ? 'success' : 'error',
            // confirmButtonText: 'Cool'
          });
    }

}