import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AquaReportService } from '../../services/aquaReport.service';
import { ModalMapaComponent } from '../shared/modal-mapa/modal-mapa.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalReporteComponent } from '../shared/modal-reporte/modal-reporte.component';
import Swal from 'sweetalert2';
import { MapsComponent } from '../shared/maps/maps.component';
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  }
@Component({
  selector: 'app-administrar-reportes',
  templateUrl: './administrar-reportes.component.html',
  styleUrls: ['./administrar-reportes.component.css']
})

export class AdministrarReportesComponent implements OnInit {

  data = [];

  categoria = [
    {id: 1, nombre: 'Asignados'},
    {id: 2, nombre: 'Pendientes'},
    {id: 3, nombre: 'Finalizados'},
  ];

  categoriaSeleccionada;
  constructor(
    private aquaReportService: AquaReportService,
    private modal: NgbModal,
  ) {

   }
  startAnimationForBarChart(chart){
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if(data.type === 'bar'){
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
    });

    seq2 = 0;
};
  ngOnInit() {
    this.categoriaSeleccionada = this.categoria[0];

    this.obtenerReportes();

    
    var datawebsiteViewsChart = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      series: [
        [542, 443, 320, 780, 553, 453, 326]

      ]
    };
    var optionswebsiteViewsChart = {
        axisX: {
            showGrid: true,
            offset: 50,
            position : 'end'
        },
        low: 0,
        high: 1000,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    let responsiveOptions: any[] = [
      ['screen and (max-width: 640px, max-height:1000px)', {
        seriesBarDistance: 0,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }] 
    ];
    var websiteViewsChart = new Chartist.Bar('#chartReportes', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

  obtenerReportes(){
    this.aquaReportService.getReportes().subscribe(
      (data:any) => {
        data.forEach(element => {
          element.id = element.id_reporte;
          element.fechaCreacion = element.created_at.split('T')[0];
          element.categoria = element.estado_nuevo == 'C' ? 1 : element.estado_nuevo == 'F' ? 3 : 2;
          element.estado = element.estado_nuevo == 'C' ? 'Asignado' : element.estado_nuevo == 'F' ? 'Finalizado' : 'Pendiente';
          element.prioridad = element.prioridad == 'A' ? 'Alta' : element.prioridad == 'M' ? 'Media' : 'Baja';
          element.personalAsignado = element.nombrePersonal + ' ' + element.apellidoPersonal;
        }
        );
        this.data = data;
        console.log(this.data);
      },)

  }

  editarReporte(reporte){
    console.log('editar');
    const modalEdit = this.modal.open(ModalReporteComponent , {
      size: 'lg',
      backdrop: false
        });
    modalEdit.componentInstance.reporte = reporte;
    modalEdit.componentInstance.resp.subscribe((resp) => {
      console.log(resp);
      this.obtenerReportes();
    }
    );
  }

  eliminarReporte(reporte){
    console.log('eliminar');
    Swal.fire({
      title: '¿Está seguro de eliminar el reporte?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        this.aquaReportService.deleteReporte(reporte.id).subscribe(
          (data:any) => {
            console.log(data);
            this.obtenerReportes();
            Swal.fire({
              title: 'Reporte eliminado correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
          }, (error) => {
            console.log(error);
            Swal.fire({
              title: 'Error al eliminar el reporte',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            })
          }
        );
      }
    })
  }

  changeCategoria(event){
    console.log(event);
    console.log(this.data);
    this.categoriaSeleccionada = event;
  }

  openModalMapa(reporte){
    console.log(reporte);

    const modalMap = this.modal.open(MapsComponent, {
      size: 'md',
      backdrop: false,
      keyboard: false,
    });
    modalMap.componentInstance.lat = reporte.latitud;
    modalMap.componentInstance.lon = reporte.longitud;
    modalMap.componentInstance.singleMarker = true;
  }

  verMapa(){
    let markers: Marker[] = [];
    this.data.forEach(element => {
      markers.push({
        lat: element.latitud,
        lng: element.longitud,
        label: element.id,
        draggable: false
      });
    });

    if(markers.length == 0){
      Swal.fire({
        title: 'No hay reportes para mostrar',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    const modalMap = this.modal.open(MapsComponent, {
      size: 'md',
      backdrop: false,
      keyboard: false,
    });
    modalMap.componentInstance.lat = markers[0].lat;
    modalMap.componentInstance.lon = markers[0].lng;
    modalMap.componentInstance.markers = markers;
    modalMap.componentInstance.singleMarker = false;
  }

}
