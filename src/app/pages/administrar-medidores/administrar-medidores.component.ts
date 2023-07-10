import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-administrar-medidores',
  templateUrl: './administrar-medidores.component.html',
  styleUrls: ['./administrar-medidores.component.css']
})
export class AdministrarMedidoresComponent implements OnInit {
  data = [
    {id: 1, categoria:1, descripcion: 'Reporte 1', fechaUltimaLectura: '01/01/2020', ultimaLectura: '100', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Juan Perez', estado: 'Activo'},
    {id: 2, categoria:2, descripcion: 'Reporte 2', fechaUltimaLectura: '01/01/2020', ultimaLectura: '200', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Lucio Alva', estado: 'Activo'},
    {id: 3, categoria:3, descripcion: 'Reporte 3', fechaUltimaLectura: '01/01/2020', ultimaLectura: '300', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal :  'Andres Silva', estado: 'Activo'},
    {id: 4, categoria:1,descripcion: 'Reporte 4', fechaUltimaLectura: '01/01/2020', ultimaLectura: '400', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Emilio Pardo', estado: 'Activo'},
    {id: 5, categoria:2, descripcion: 'Reporte 5', fechaUltimaLectura: '01/01/2020', ultimaLectura: '500', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Luna Da Silva', estado: 'Activo'},
    {id: 6,categoria:3,  descripcion: 'Reporte 6', fechaUltimaLectura: '01/01/2020', ultimaLectura: '560', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Jhon Doe', estado: 'Activo'},
    {id: 7, categoria:1,descripcion: 'Reporte 7', fechaUltimaLectura: '01/01/2020', ultimaLectura: '670', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Leonardo Da Vinci', estado: 'Activo'},
    {id: 8, categoria:1, descripcion: 'Reporte 8', fechaUltimaLectura: '01/01/2020', ultimaLectura: '720', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Miguel Angel', estado: 'Activo'},
    {id: 9,categoria:1,  descripcion: 'Reporte 9', fechaUltimaLectura: '01/01/2020', ultimaLectura: '800', fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Diego Maradona', estado: 'Activo'},
    {id: 10, categoria:1,descripcion: 'Reporte 10', fechaUltimaLectura: '01/01/2020', ultimaLectura: '110', fechaCreacion: '01/01/2019',fechaProximaLectura: '01/01/2018', personal : 'Hugo Quintana', estado: 'Activo'},
    {id: 11, categoria:1, descripcion: 'Reporte 11', fechaUltimaLectura: '01/01/2020', ultimaLectura: '113',fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Quentin Tarantino', estado: 'Activo'},
    {id: 12,categoria:3,  descripcion: 'Reporte 12', fechaUltimaLectura: '01/01/2020', ultimaLectura: '901',fechaCreacion: '01/01/2019', fechaProximaLectura: '01/01/2018', personal : 'Zinedine Zidane', estado: 'Activo'}
  ];

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
    {id: 1, nombre: 'Asignados'},
    {id: 2, nombre: 'Pendientes'},
    {id: 3, nombre: 'Creados'},
  ];
  dataChart: any;
  medidorSeleccionado;
  categoriaSeleccionada;
  personalBusqueda: any;
  dataView: any;
  constructor() { }
  
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
    this.dataView = this.data;
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
    console.log(event);
    this.categoriaSeleccionada = event;
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
}
