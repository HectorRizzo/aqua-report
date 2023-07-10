import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-administrar-reportes',
  templateUrl: './administrar-reportes.component.html',
  styleUrls: ['./administrar-reportes.component.css']
})
export class AdministrarReportesComponent implements OnInit {

  data = [
    {id: 1, categoria:1, descripcion: 'Reporte 1', ubicacion: 'ubicacion 1', prioridad: 'Alta', estado: 'Pendiente', fechaCreacion: '01/01/2020'},
    {id: 2, categoria:2, descripcion: 'Reporte 2', ubicacion: 'ubicacion 2', prioridad: 'Media', estado: 'Pendiente', fechaCreacion: '01/01/2020'},
    {id: 3, categoria:3, descripcion: 'Reporte 3', ubicacion: 'ubicacion 3', prioridad: 'Baja', estado: 'Pendiente', fechaCreacion: '01/01/2020'},
    {id: 4, categoria:1,descripcion: 'Reporte 4', ubicacion: 'ubicacion 4', prioridad: 'Alta', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 5, categoria:2, descripcion: 'Reporte 5', ubicacion: 'ubicacion 5', prioridad: 'Media', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 6,categoria:3,  descripcion: 'Reporte 6', ubicacion: 'ubicacion 6', prioridad: 'Baja', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 4, categoria:1,descripcion: 'Reporte 4', ubicacion: 'ubicacion 4', prioridad: 'Alta', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 5, categoria:1, descripcion: 'Reporte 5', ubicacion: 'ubicacion 5', prioridad: 'Media', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 6,categoria:1,  descripcion: 'Reporte 6', ubicacion: 'ubicacion 6', prioridad: 'Baja', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 4, categoria:1,descripcion: 'Reporte 4', ubicacion: 'ubicacion 4', prioridad: 'Alta', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 5, categoria:1, descripcion: 'Reporte 5', ubicacion: 'ubicacion 5', prioridad: 'Media', estado: 'Creado', fechaCreacion: '01/02/2019'},
    {id: 6,categoria:3,  descripcion: 'Reporte 6', ubicacion: 'ubicacion 6', prioridad: 'Baja', estado: 'Creado', fechaCreacion: '01/02/2019'}
  ];

  categoria = [
    {id: 1, nombre: 'Asignados'},
    {id: 2, nombre: 'No Asignados'},
    {id: 3, nombre: 'Finalizados'},
  ];

  categoriaSeleccionada;
  constructor() { }
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

  changeCategoria(event){
    console.log(event);
    this.categoriaSeleccionada = event;
  }

}
