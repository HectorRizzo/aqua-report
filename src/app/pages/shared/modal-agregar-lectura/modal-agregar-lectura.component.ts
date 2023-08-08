import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AquaReportService } from 'app/services/aquaReport.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
    selector: 'app-modal-agregar-lectura',
    templateUrl: './modal-agregar-lectura.component.html',
    styleUrls: ['./modal-agregar-lectura.component.scss']
  })


export class ModalAgregarLecturaComponent implements OnInit {
    @Input() lecturaBase: any;
    @Output() resp: EventEmitter<any> = new EventEmitter();
    codigoRespuestaHttp;
    loading = false;
    mensaje = '';
    lectura : any = {};
    picker = {
        date: {
            year: 2020,
            month: 1,
            day: 1
        }
    }
    mostrarMensaje = false;
    personal = [];
    medidores = [];
    personalSeleccionado;
    medidorSeleccionado;
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
        console.log(this.lecturaBase);
        if(this.lecturaBase){
this.lectura.fecha = this.lecturaBase.fechaProximaLectura;
this.lectura.activo = this.lecturaBase.repeticion > 0;
this.lectura.dias = this.lecturaBase.repeticion;
        }
        this.obtenerPersonal();
        this.obtenerMedidores();
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
            })
            this.personal = data;
            if(this.lecturaBase) this.personalSeleccionado = this.personal.find((personal) => personal.id == this.lecturaBase.id_usuario_asignado);
        }
        );
    }
    obtenerMedidores() {
        this.aquaReportService.getMedidores().subscribe((res: any) => {
            res.data.forEach(element => {
                element.id = element.id_medidor;
            })
            this.medidores = res.data;
            if(this.lecturaBase) this.medidorSeleccionado = this.medidores.find((medidor) => medidor.id == this.lecturaBase.id_medidor);
        }
        );
    }

    actualizar(){
        this.loading = true;
        console.log(this.lectura);
        if(!this.personalSeleccionado || !this.medidorSeleccionado || !this.lectura['fecha']){
            this.muestraMensaje('Por favor ingrese todos los campos', 500);
            this.loading = false;
            return;
        }
        let body = {
            id: this.lecturaBase.id,
            medidor: this.medidorSeleccionado.id,
            id_usuario_asignado: this.personalSeleccionado.id,
            fechaLectura: this.lectura['fecha'],
            repeticion: this.lectura['activo'] ? this.lectura['dias'] : null,
        }
        this.aquaReportService.actualizarLectura(body,this.lecturaBase.id ).subscribe((data: any) => {
            console.log(data);
            this.loading = false;
            this.muestraMensaje('Lectura actualizada correctamente', 200);
            this.closeModal();
            this.resp.emit();
        }, (error) => {
            this.loading = false;
            this.muestraMensaje('Error al actualizar la lectura', 500);
        }
        );
    }


    guardar(){
        this.loading = true;
        console.log(this.lectura);
        console.log(this.personalSeleccionado);
        if(!this.personalSeleccionado || !this.medidorSeleccionado || !this.lectura['fecha']){
            this.muestraMensaje('Por favor, ingrese todos los campos', 500);
            this.loading = false;
            return;
        }
        if(this.lectura['activo'] && (!this.lectura['dias'] || this.lectura['dias'] == 0)){
            this.muestraMensaje('Por favor, si desea activar la repeticion, ingrese los dias', 500);
            this.loading = false;
            return;
        }
        this.aquaReportService.getLecturas().subscribe((data: any) => {
            console.log(data);
            let body = {
                id: data.total + 1,
                medidor: this.medidorSeleccionado.id,
                usuario: this.personalSeleccionado.id,
                fechaLectura: this.lectura['fecha'],
                repeticion: this.lectura['activo'] ? this.lectura['dias'] : null,
            }
            this.aquaReportService.crearLectura(body).subscribe((data: any) => {
                console.log(data);
                this.loading = false;
                this.muestraMensaje('Lectura creada correctamente', 200);
                this.closeModal();
                this.resp.emit();
            }, (error) => {
                this.loading = false;
                this.muestraMensaje('Error al crear la lectura', 500);
            }
            );
        }, (error) => {
            this.loading = false;
            this.muestraMensaje('Error al crear la lectura', 500);
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

    changeMedidor(event){
        console.log(event);
        this.medidorSeleccionado = event;
    }







}