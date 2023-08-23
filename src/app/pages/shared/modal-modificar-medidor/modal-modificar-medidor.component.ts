import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AquaReportService } from 'app/services/aquaReport.service';
import Swal from 'sweetalert2';
import { MapsComponent } from '../maps/maps.component';

declare const google: any;
const LATITUD_ESPOL = -2.146767885987852;
const LONGITUD_ESPOL = -79.96596660850554;

@Component({
    selector: 'app-modal-modificar-medidor',
    templateUrl: './modal-modificar-medidor.component.html',
    styleUrls: ['./modal-modificar-medidor.component.scss']
  })


export class ModalModificarMedidorComponent implements OnInit {
    medidor: any = {};
    @Output() resp: EventEmitter<any> = new EventEmitter();
    codigoRespuestaHttp;
    loading = false;
    mensaje = '';
    mostrarMensaje = false;
    medidorSeleccionado;
    medidores = [];
    constructor(
    private activeModal: NgbActiveModal,
    private modal : NgbModal,
    private aquaReportService: AquaReportService,
    ) { }

    ngOnInit(): void {
        console.log("aqio");
        this.obtenerMedidores();
    }

    obtenerMedidores(){
        this.aquaReportService.getMedidores().subscribe((res: any) => {
            res.data.forEach(element => {
                element.id = element.id_medidor;
            })
            console.log(res);
            this.medidores = res.data;
        }, (error) => {
            this.muestraMensaje('Error al obtener los medidores', 500);
        }
        );
    }

    changeMedidor(medidor) {
        console.log(medidor);
        this.medidorSeleccionado = medidor;
        this.medidor.nombre = medidor.nombre;
        this.medidor.latitud = medidor.latitud;
        this.medidor.longitud = medidor.longitud;
        this.medidor.id = medidor.id;

    }

    obtenerLecturasXMedidor() {
        this.aquaReportService.getLecturasXMedidor(this.medidorSeleccionado.id).subscribe((res: any) => {
            console.log(res.data);
            this.medidor.lecturas = res.data;

            Swal.fire({
                title: 'Se eliminaran las siguientes lecturas',
                html:`<table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">N° Lectura</th>
                    <th scope="col">Fecha Proxima Lectura</th>
                    <th scope="col"> Ultima Lectura</th>
                    <th scope="col"> Personal </th>
                </tr>
                </thead>`+
                 this.medidor.lecturas.map((item) => {
                    
                    return `
                    <tbody>
                      <tr>
                        <td>${item.id_lectura}</td>
                        <td>${item.fecha_proxima_lectura ? item.fecha_proxima_lectura.split('T')[0] : ''}</td> 
                        <td>${item.ultima_lectura ? item.ultima_lectura : ''}</td>
                        <td>${item.nombrePersonal}</td>
                      </tr>
                    </tbody>`
                }
                ).join('') + `</table>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
                }).then((result) => {
                if (result.value) {
                    this.loading = true;
                    this.eliminarLecturasXMedidor(this.medidorSeleccionado.id);
                }
            }
            );

        }, (error) => {
            this.muestraMensaje('Error al obtener las lecturas del medidor', 500);
        }
        );
    }

    actualizarMedidor(medidor) {
        this.loading = true;
        if(!medidor.nombre && !medidor.latitud && !medidor.longitud) {
            this.muestraMensaje('Por favor ingrese al menos un campos', 500);
            this.loading = false;
            return;
        }
        let body = {
            nombre: medidor.nombre,
            latitud: medidor.latitud,
            longitud: medidor.longitud
        }
        console.log(body);
        console.log(this.medidor.id);
        this.aquaReportService.actualizarMedidor(body,this.medidor.id).subscribe((data: any) => {
            console.log(data);
            this.loading = false;
            this.muestraMensaje('Medidor actualizado correctamente', 200);
            this.closeModal();
            this.resp.emit();
        }, (error) => {
            this.loading = false;
            this.muestraMensaje('Error al actualizar el medidor', 500);
        }
        );
    }

    eliminarLecturasXMedidor(idMedidor) {
        this.aquaReportService.eliminarLecturasXMedidor(idMedidor).subscribe((data: any) => {
            console.log(data);
            this.muestraMensaje('Lecturas eliminadas correctamente', 200);
            this.eliminarMedidor();
        }, (error) => {
            this.loading = false;
            this.muestraMensaje('Error al eliminar las lecturas', 500);
        }
        );
    }

    eliminarMedidor() {
        this.aquaReportService.eliminarMedidor(this.medidor.id).subscribe((data: any) => {
            console.log(data);
            this.loading = false;
            this.muestraMensaje('Medidor eliminado correctamente', 200);
            this.closeModal();
            this.resp.emit();
        }, (error) => {
            this.loading = false;
            this.muestraMensaje('Error al eliminar el medidor', 500);
        }
        );
    }

    openModal() {
        const modal = this.modal.open(MapsComponent, { size: 'lg', backdrop: false, keyboard: false });
        modal.componentInstance.latitud = this.medidorSeleccionado.latitud;
        modal.componentInstance.longitud = this.medidorSeleccionado.longitud;
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