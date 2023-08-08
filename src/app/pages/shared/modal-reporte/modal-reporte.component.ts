import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AquaReportService } from 'app/services/aquaReport.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
    selector: 'app-modal-reporte',
    templateUrl: './modal-reporte.component.html',
    styleUrls: ['./modal-reporte.component.scss']
  })


export class ModalReporteComponent implements OnInit {
    @Input() reporte: any;
    @Output() resp: EventEmitter<any> = new EventEmitter();
    codigoRespuestaHttp;
    loading = false;
    mensaje = '';
    mostrarMensaje = false;
    personal = [];
    personalSeleccionado;
    prioridadSeleccionada;
    prioridad = [
        {
            id: 'B',
            nombre: 'Baja'
        },
        {
            id: 'M',
            nombre: 'Media'
        },
        {
            id: 'A',
            nombre: 'Alta'
        }
    ]
    constructor(
    private activeModal: NgbActiveModal,
    private aquaReportService: AquaReportService,
    ) { }

    ngOnInit(): void {
        this.obtenerPersonal();
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

    obtenerPersonal() {
        this.aquaReportService.getPersonal().subscribe((data: any) => {
            data.forEach(element => {
                element.nombre = element.nombre;
                element.id = element.id;
            })
            this.personal = data;
        }
        );
    }

    asignarReporte(){
        this.loading = true;
        if(this.personalSeleccionado == undefined || this.prioridadSeleccionada == undefined){
            this.muestraMensaje('Debe llenar todos los campos', 500);
            this.loading = false;
            return;
        }
        let body = {
            idPersonal: this.personalSeleccionado.id,
            prioridad: this.prioridadSeleccionada.id
        }
        this.aquaReportService.asignarPersonal(this.reporte.id, body).subscribe((data: any) => {
            console.log(data);
            this.loading = false;
            this.muestraMensaje('Reporte asignado correctamente', 200);
            this.closeModal();
            this.resp.emit();
        }, (error) => {
            this.loading = false;
            this.muestraMensaje('Error al asignar el reporte', 500);
        }
        );
    }

    cancelar(){
        this.closeModal();
    }

    changePersonal(event){
        console.log(event);
        this.personalSeleccionado = event;
    }

    changePrioridad(event){
        console.log(event);
        this.prioridadSeleccionada = event;
    }


}