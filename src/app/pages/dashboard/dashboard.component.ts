import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reportes = [
    {
      titulo: 'Total Reportes',
      cantidad: '100',
      color: 'total',
    },
    {
      titulo: 'Reportes No Asignados',
      cantidad: '12',
      color: 'no-asignados',
    },
    {
      titulo: 'Reportes Finalizados',
      cantidad: '88',
      color: 'finalizados',
    },
  ];
  ultimosReportes = [
    {
      fecha : '20/10/2020',
      hora : '10:00',
      ubicacion : 'Espol, FIEC',
    },
    {
      fecha : '20/11/2020',
      hora : '11:00',
      ubicacion: 'Espol, FIMCP',
    },
    {
      fecha : '20/12/2020',
      hora : '12:00',
      ubicacion: 'Espol, FCNM',
    },
    {
      fecha : '20/01/2021',
      hora : '13:00',
      ubicacion: 'Espol, FCSH',
    }
  ];

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


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

 

      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

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
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }

}
