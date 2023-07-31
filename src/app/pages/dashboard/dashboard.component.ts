import { Component, OnInit } from '@angular/core';
import { AquaReportService } from 'app/services/aquaReport.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reportes = [

  ];
  ultimosReportes = [];

  constructor(
    private aquaReportService: AquaReportService,
  ) { }


  ngOnInit() {
    this.obtenerReportes();
    this.obtenerReportesFinalizados();
    this.obtenerReportesNoAsignados();

  }

  obtenerReportes(){
    this.aquaReportService.getReportes().subscribe(
      (data:any) => {
        this.reportes.push({
          titulo: 'Total Reportes',
          cantidad: data.length,
          color: 'total',
        })

        this.ultimosReportes = data.slice(0,4);
        this.ultimosReportes.forEach(element => {
          element.fecha = element.created_at.split('T')[0];
          element.hora = element.created_at.split('T')[1].split('.')[0];
      })
      },)
  }

  obtenerReportesFinalizados(){
    this.aquaReportService.getReportesFinalizados().subscribe(
      (data:any) => {
        this.reportes.push({
          titulo: 'Reportes Finalizados',
          cantidad: data.length,
          color: 'finalizados',
        })
      },)
  }

  obtenerReportesNoAsignados(){
    this.aquaReportService.getReportesNoAsignados().subscribe(
      (data:any) => {
        this.reportes.push({
          titulo: 'Reportes No Asignados',
          cantidad: data.length,
          color: 'no-asignados',
        })
      },)
  }


}
