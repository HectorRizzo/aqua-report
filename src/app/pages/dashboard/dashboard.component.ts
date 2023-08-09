import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AquaReportService } from 'app/services/aquaReport.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loading = false;
  cargando = false;
    // escalas dinamicas en funcion de su contenedor
    private width = 0;
    private height = 200;
    private margin = 50;
    public svg;
    public svgInner;
    public yScale;
    public xScale;
    public xAxis;
    public yAxis;
    public lineGroup;
    public dots;

  reportes = [

  ];
  ultimosReportes = [];

  dataGrafico = [
  ]

  dataGraficoSeleccionado = [];
  meses = new FormControl('');
  listaMeses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  constructor(
    private aquaReportService: AquaReportService,
    private viewContainerRef: ViewContainerRef
  ) { }


  async ngOnInit() {
    this.obtenerReportes();
    this.obtenerReportesFinalizados();
    this.obtenerReportesNoAsignados();
    await this.obtenerReportesXMes();

  }

  obtenerReportes(){
    this.loading = true;
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

      },
      (err:any) => {
        console.log(err);
      }
    )
  }

  obtenerReportesFinalizados(){
    this.aquaReportService.getReportesFinalizados().subscribe(
      (data:any) => {
        this.reportes.push({
          titulo: 'Reportes Finalizados',
          cantidad: data.length,
          color: 'finalizados',
        })
      },
      (err:any) => {
        console.log(err);
      }
    )
  }

  obtenerReportesNoAsignados(){
    this.loading = true;
    this.aquaReportService.getReportesNoAsignados().subscribe(
      (data:any) => {
        this.reportes.push({
          titulo: 'Reportes No Asignados',
          cantidad: data.length,
          color: 'no-asignados',
        })
        this.loading = false;
      },
      (err:any) => {
        console.log(err);
        this.loading = false;
      }
    )
  }

  async obtenerReportesXMes(){
    this.aquaReportService.getReportesPorMes().subscribe(
      (res: any) => {
        console.log(res);
        res.data = res.data.map((element: any) => {
          element.mes = this.listaMeses[element.mes - 1];
          return element;
        });
        this.dataGrafico = res.data;
        this.dataGraficoSeleccionado = this.dataGrafico;
        this.createSvgPrioridad();
      },
      (err: any) => {
        console.log(err);
      }
    )

  }

  createSvgPrioridad() {
console.log("createSvgPrioridad");
    const barChart = document.querySelector('.card-bar');
    console.log(barChart.getBoundingClientRect());
    //width
    const { width } = barChart.getBoundingClientRect();
    this.width = width;
    console.log(this.width);

    console.log(this.width);
    let container = d3.select('.promPrioridad'),
      margin = {top: 30, right: 90, bottom: 30, left: 90},
      barPadding = .2,
      axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

    let svgPrioridad = container
     .append("svg")
     .attr("width", this.width)
     .attr("height", this.height)
     .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);

    let xScale = d3.scaleBand().range([0, this.width - margin.left - margin.right]).padding(barPadding)
    let yScale = d3.scaleLinear().range([this.height - margin.top - margin.bottom, 0])

    let xAxis = d3.axisBottom(xScale).tickSizeOuter(axisTicks.outerSize);
    let yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

    xScale.domain(this.dataGraficoSeleccionado.map(d => d.mes))
    yScale.domain([0, d3.max(this.dataGraficoSeleccionado, d => d.cantidad)])

    //Tooltip
    const tooltip = d3
    .select(this.viewContainerRef.element.nativeElement)
    .select(".promPrioridad")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0.7)
    .style("position", "absolute")

    // funciones de tooltip
    const mouseover = (d:any) => {
      console.log(d);
      d3.select(d.target)
      .style("stroke", "black")
      .style("opacity", 1)
        
    tooltip
    .style("opacity", 1)
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("border", "solid")
    .style("border-width", "1px")
    .html(d.target.__data__.mes + "<br/>"  +  "Cantidad: " + d.target.__data__.cantidad)
    .style("left", (d.offsetX) + "px")
    .style("top", (d.offsetY) + "px")
    }

    const mouseleave = (d:any) => {
      d3.select(d.target)
      .style("stroke", "none")
      .style("opacity", 0.8)

    }
    // Add the X Axis
    svgPrioridad.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${this.height - margin.top - margin.bottom})`)
    .call(xAxis);
    // Add the Y Axis
    svgPrioridad.append("g")
    .attr("class", "y axis")
    .call(yAxis);

    let bar = svgPrioridad.selectAll(".bar")
    .data(this.dataGraficoSeleccionado)
    .enter()
    .append("g")
    .attr("class", "bar");

    //append rects
    bar.append("rect")
    .attr("class", "rect")
    .attr("x", d => xScale(d.mes))
    .attr("y", d => yScale(d.cantidad))
    .attr("width", xScale.bandwidth())
    .attr("fill", "#118dff")
    .attr("height", d => {
      return this.height - margin.top - margin.bottom - yScale(d.cantidad)
    }
    )
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave)

    //add a value label to the top of each bar
    bar.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", d => yScale(d.cantidad) + 20)
    //x position is 3 pixels to the right of the bar
    .attr("x", d => xScale(d.mes) + xScale.bandwidth() / 2)
    .attr("text-anchor", "middle")
    .text(d => d.cantidad);



  }

  filtrarPrioridad(){
    console.log("filtrarPrioridad");
    this.dataGraficoSeleccionado = [];
    this.dataGrafico.forEach(element => {
      if(this.meses.value.includes(element.mes)){
        this.dataGraficoSeleccionado.push(element);
      }
    });
    this.eliminarSvgPrioridad();
    this.width = 900;
    this.createSvgPrioridad();
  }

  eliminarSvgPrioridad(){
    d3.select(".promPrioridad").select("svg").remove();
  }


}
