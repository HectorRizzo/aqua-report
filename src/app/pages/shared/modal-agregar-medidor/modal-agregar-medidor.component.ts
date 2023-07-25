import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AquaReportService } from 'app/services/aquaReport.service';
import Swal from 'sweetalert2';
import { MapsComponent } from '../maps/maps.component';

declare const google: any;
const LATITUD_ESPOL = -2.146767885987852;
const LONGITUD_ESPOL = -79.96596660850554;

@Component({
    selector: 'app-modal-agregar-medidor',
    templateUrl: './modal-agregar-medidor.component.html',
    styleUrls: ['./modal-agregar-medidor.component.scss']
  })


export class ModalAgregarMedidorComponent implements OnInit {
    medidor: any = {};
    @Output() resp: EventEmitter<any> = new EventEmitter();
    codigoRespuestaHttp;
    loading = false;
    mensaje = '';
    mostrarMensaje = false;
    constructor(
    private activeModal: NgbActiveModal,
    private modal : NgbModal,
    private aquaReportService: AquaReportService,
    ) { }

    ngOnInit(): void {
    }

    crearMedidor(medidor) {
        this.loading = true;
        if(!medidor.nombre || !medidor.latitud || !medidor.longitud) {
            this.muestraMensaje('Por favor ingrese todos los campos', 500);
            this.loading = false;
            return;
        }
        this.aquaReportService.getMedidores().subscribe((data: any) => {
            console.log(data);
            let body = {
                id: data.total + 1,
                nombre: medidor.nombre,
                latitud: medidor.latitud,
                longitud: medidor.longitud
            }
            this.aquaReportService.crearMedidor(body).subscribe((data: any) => {
                console.log(data);
                this.loading = false;
                this.muestraMensaje('Medidor creado correctamente', 200);
                this.closeModal();
                this.resp.emit();
            }, (error) => {
                this.loading = false;
                this.muestraMensaje('Error al crear el medidor', 500);
            }
            );
        }, (error) => {
            this.loading = false;
            this.muestraMensaje('Error al crear el medidor', 500);
        }
        );


    }




    openModal() {
        const modal = this.modal.open(MapsComponent, { size: 'lg', backdrop: false, keyboard: false });
        modal.componentInstance.latitud = LATITUD_ESPOL;
        modal.componentInstance.longitud = LONGITUD_ESPOL;
        modal.componentInstance.permitirSeleccionar = true;
        modal.componentInstance.latLon.subscribe((data) => {
            console.log(data);
            this.medidor.latitud = data.lat;
            this.medidor.longitud = data.lon;
        }   );

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