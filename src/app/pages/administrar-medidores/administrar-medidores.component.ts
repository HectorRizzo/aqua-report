import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AquaReportService } from 'app/services/aquaReport.service';
import * as Chartist from 'chartist';
import { ModalAgregarMedidorComponent } from '../shared/modal-agregar-medidor/modal-agregar-medidor.component';
import { ModalAgregarLecturaComponent } from '../shared/modal-agregar-lectura/modal-agregar-lectura.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-medidores',
  templateUrl: './administrar-medidores.component.html',
  styleUrls: ['./administrar-medidores.component.css']
})
export class AdministrarMedidoresComponent implements OnInit {
  data:any = [];
  medidores = [
    {
      nombre: 'EFC-001',
      ubicacion: 'FIEC',
      valores: [
        {
          fecha: '01/01/2020',
          valor: '100',
        },
        {
          fecha: '01/02/2020',
          valor: '200',
        },
        {
          fecha: '01/03/2020',
          valor: '300',
        },
        {
          fecha: '01/04/2020',
          valor: '400',
        },
        {
          fecha: '01/05/2020',
          valor: '500',
        },
        {
          fecha: '01/06/2020',
          valor: '600',
        },
        {
          fecha: '01/07/2020',
          valor: '700',
        },
        {
          fecha: '01/08/2020',
          valor: '800',
        },
      ]
    },
    {
      nombre: 'EFC-002',
      ubicacion: 'FIMCP',
      valores: [
        {
          fecha: '01/01/2020',
          valor: '78',
        },
        {
          fecha: '01/02/2020',
          valor: '97',
        },
        {
          fecha: '01/03/2020',
          valor: '100',
        },
        {
          fecha: '01/04/2020',
          valor: '34',
        },
        {
          fecha: '01/05/2020',
          valor: '56',
        },
        {
          fecha: '01/06/2020',
          valor: '43',
        },
        {
          fecha: '01/07/2020',
          valor: '78',
        },
        {
          fecha: '01/08/2020',
          valor: '90',
        },
      ]
    },
    {
      nombre: 'EFC-003',
      ubicacion: 'FCNM',
      valores: [
        {
          fecha: '01/01/2020',
          valor: '100',
        },
        {
          fecha: '01/02/2020',
          valor: '400',
        },
        {
          fecha: '01/03/2020',
          valor: '500',
        },
        {
          fecha: '01/04/2020',
          valor: '60',
        },
        {
          fecha: '01/05/2020',
          valor: '70',
        },
        {
          fecha: '01/06/2020',
          valor: '34',
        },
        {
          fecha: '01/07/2020',
          valor: '56',
        },
        {
          fecha: '01/08/2020',
          valor: '78',
        }
      ]
    },
  ];




  categoria = [
    {id: 1, nombre: 'Pendientes'},
    {id: 2, nombre: 'Finalizados'},
  ];
  dataChart: any;
  medidorSeleccionado;
  categoriaSeleccionada;
  personalBusqueda: any;
  dataView: any;
  constructor(
    private aquaReportService: AquaReportService,
    private modal: NgbModal
  ) { }
  
  startAnimationForBarChart(chart){
    console.log("animation started");
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
    this.obtenerLecturas();
    this.categoriaSeleccionada = this.categoria[0];

    this.dataChart = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      series: [
          [230, 750, 450, 300, 280, 240, 200]
      ]
  };

    let  optionChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    } 
    
    let completedTasksChart = new Chartist.Line('#dailySalesChart', this.dataChart, optionChart);

    
    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);
    }
  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });
  }


  changeCategoria(event){
    console.log(this.data);
    console.log(event);
    this.categoriaSeleccionada = event;
  }
  modalMedidor(){
    console.log("modalMedidor");
    const modalAgregar = this.modal.open(ModalAgregarMedidorComponent, 
      { size: 'lg', backdrop: false, keyboard: false });
    modalAgregar.componentInstance.resp.subscribe((data) => {
      console.log(data);
      this.obtenerLecturas();
    }
    );
    
  }

  modalLectura(item?){
    console.log(item);
    console.log("modalLectura");
    const modalAgregarLectura = this.modal.open(ModalAgregarLecturaComponent,
      { size: 'md', backdrop: false, keyboard: false });
      modalAgregarLectura.componentInstance.lecturaBase = item ? item : null;
      modalAgregarLectura.componentInstance.resp.subscribe((data) => {
        console.log(data);
        this.obtenerLecturas();
      }
      );
  }
  eliminarLectura(lectura){
    Swal.fire({
      title: '¿Está seguro de eliminar la lectura?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        this.aquaReportService.eliminarLectura(lectura.id).subscribe(
          (data:any) => {
            console.log(data);
            this.obtenerLecturas();
            Swal.fire({
              title: 'Lectura eliminado correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
          }, (error) => {
            console.log(error);
            Swal.fire({
              title: 'Error al eliminar la lectura',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            })
          }
        );
      }
    })
  }

  setDataChart(medidor){
    this.medidorSeleccionado = medidor;
    console.log("setDataChart");
    console.log(medidor);
    this.dataChart = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
      series: [
          medidor.valores.map((item) => {
            return item.valor;
          })
        ]
    };
    let  optionChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: (medidor.valores.max + 100),
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    } 

    console.log(this.dataChart);

    let completedTasksChart = new Chartist.Line('#dailySalesChart', this.dataChart, optionChart);

    
    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);
  }

  buscarPersonal(){
    console.log(this.personalBusqueda);
    this.dataView = this.data.filter((item) => {
      return item.personal.toLowerCase().includes(this.personalBusqueda.toLowerCase());
    }
    );
  }

  obtenerLecturas(){
    this.aquaReportService.getLecturas().subscribe((res:any) => {
      console.log(res);
      res.data.forEach(item => {
        item.id = item.id_lectura,
        item.fechaUltimaLectura = item.fecha_ultima_lectura,
        item.ultimaLectura = item.ultima_lectura,
        item.fechaCreacion = item.fecha_creacion.split('T')[0],
        item.fechaProximaLectura = item.fecha_proxima_lectura.split('T')[0],
        item.personal = item.nombrePersonal,
        item.categoria = item.estado == 'P' ? 1 : 2,
        item.activo = item.repeticion == 1 ? true : false;
      });
      this.data = res.data;
      this.dataView = this.data;
    });
  }
}
