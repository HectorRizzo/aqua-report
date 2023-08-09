import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import * as Chartist from 'chartist';
import { AquaReportService } from '../../services/aquaReport.service';
import { ModalMapaComponent } from '../shared/modal-mapa/modal-mapa.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalReporteComponent } from '../shared/modal-reporte/modal-reporte.component';
import Swal from 'sweetalert2';
import { MapsComponent } from '../shared/maps/maps.component';
import { Subject, debounceTime } from 'rxjs';

import * as d3 from 'd3';
import { FormControl } from '@angular/forms';

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

  private _updateLayout$ = new Subject<void>();
  data= [];
  categoria = [
    {id: 1, nombre: 'Asignados'},
    {id: 2, nombre: 'Pendientes'},
    {id: 3, nombre: 'Finalizados'},
  ];
  titulo = 'Reportes';
  datosGrafico = [
    {valorX: 10},
    {valorX: 20},
  ];
  // escalas dinamicas en funcion de su contenedor
  private width = 0;
  private height = 400;
  private margin = 50;
  public svg;
  public svgInner;
  public yScale;
  public xScale;
  public xAxis;
  public yAxis;
  public lineGroup;
  public dots;

  dataPromedio = [
    {
      value: 20,
      label: 'Creacion a Asignacion'
    },
    {
      value: 10,
      label: 'Asignacion a Aceptacion'
    },
    {
      value: 30,
      label: 'Aceptacion a En Curso'
    },
    {
      value: 40,
      label: 'En Curso a Finalizado'
    }
  ];
  dataPromedioSeleccionado = [
  ];
  dataPrioridad = [
  ];

  dataPrioridadSeleccionado = [
  ];

  meses = new FormControl('');
  listaMeses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];

  etapas = new FormControl('');
  listaEtapas: string[] = ['Creacion a Asignacion', 'Asignacion a Aceptacion', 'Aceptacion a En Curso', 'En Curso a Finalizado'];
  
  elem: any;
  @ViewChild('svgContainer', { static: false, read: ElementRef }) svgContainer: ElementRef<HTMLDivElement>;
  nombreGrafico: string;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._updateLayout$.next();
  }
  categoriaSeleccionada;

   constructor(
    private aquaReportService: AquaReportService,
    private modal: NgbModal,
    private viewContainerRef: ViewContainerRef) {
      this._updateLayout$
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.createSvgEtapas();
      })

  }
  
  ngOnInit() {
    this.categoriaSeleccionada = this.categoria[0];
    this.dataPromedioSeleccionado = this.dataPromedio;
    this.obtenerReportes();
    this.createSvgEtapas();
    this.obtenerReportesXPrioridad();
  }

  obtenerReportesXPrioridad(){
    this.aquaReportService.getReportesPorPrioridad().subscribe(
      (res:any) => {
        res.data.forEach(element => {
          let index = element.mes - 1;
          element.mes = this.listaMeses[element.mes - 1];

          if(this.dataPrioridad[index] === undefined ){

            this.dataPrioridad[index] = {
              "mes": element.mes,
              "baja": 0,
              "media": 0,
              "alta": 0
            };
          }
            
          switch (element.prioridad) {
            case 'A':
              this.dataPrioridad[index].alta += element.cantidad;
              break;
            case 'M':
              this.dataPrioridad[index].media += element.cantidad;
              break;
            case 'B':
              this.dataPrioridad[index].baja += element.cantidad;
              break;
          }
        });
        console.log(this.dataPrioridad)
        this.dataPrioridadSeleccionado = this.dataPrioridad;
        this.createSvgPrioridad();

      },)

  }

  createSvgEtapas() {
    const linechartDiv = document.querySelector('.card-line');

    // Obtener las dimensiones del contenedor padre
      const { width } = linechartDiv.getBoundingClientRect();
    this.width = width;
    this.svg = d3
    .select(this.viewContainerRef.element.nativeElement)
    .select(".linechart")
    .append("svg")
    .attr("height", this.height);

    this.svgInner = this.svg
  .append("g")
  .style("transform", "translate(" + this.margin + "px, " + this.margin + "px)");

    // x,y escala
    this.yScale = d3
      .scaleLinear()
      .domain([d3.max(this.dataPromedioSeleccionado, d => d.value), 0])
      .range([0, this.height - 2 * this.margin]);

      //escala x es string
    this.xScale = d3
      .scaleBand()
      .domain(this.dataPromedioSeleccionado.map(d => d.label))
      .range([this.margin, this.width - 2 * this.margin])
     



    //x,y axis
    this.yAxis = this.svgInner
      .append("g")
      .attr("id", "y-axis")
      .style("transform", "translate(" + this.margin + "px, 0)");
    this.xAxis = this.svgInner
      .append("g")
      .attr("id", "x-axis")
      .style("transform", "translate(0, " + (this.height - 2 * this.margin) + "px)");

    //linea
    this.lineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', 'red')
      .style('stroke-width', '2px');
      this.drawChartEtapas();

  }

  createSvgPrioridad() {
    const barChart = document.querySelector('.card-bar');

    //width
    const { width } = barChart.getBoundingClientRect();
    this.width = width;
    this.width = this.viewContainerRef.element.nativeElement.getBoundingClientRect().width;
    this.svg.attr("width", this.width);

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

    let xScale0 = d3.scaleBand().range([0, this.width - margin.left - margin.right]).padding(barPadding)
    let xScale1 = d3.scaleBand()
    let yScale = d3.scaleLinear().range([this.height - margin.top - margin.bottom, 0])

    let xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
    let yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

    xScale0.domain(this.dataPrioridadSeleccionado.map(d => d.mes))
    xScale1.domain(['baja', 'media', 'alta']).range([0, xScale0.bandwidth()])
    yScale.domain([0, d3.max(this.dataPrioridadSeleccionado, d => Math.max(d.baja, d.media, d.alta))]);

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
    .html(d.target.__data__.mes + "<br/>"  + "Baja: " + d.target.__data__.baja + "<br/>"  + "Media: " + d.target.__data__.media + "<br/>"  + "Alta: " + d.target.__data__.alta)
    .style("left", (d.offsetX) + "px")
    .style("top", (d.offsetY) + "px")
    }

    const mouseleave = (d:any) => {
      d3.select(d.target)
      .style("stroke", "none")
      .style("opacity", 0.8)

      tooltip
      .style("opacity", 0)
      .html("")
    }


    let mesSelect = svgPrioridad.selectAll(".mes")
    .data(this.dataPrioridadSeleccionado)
    .enter().append("g")
    .attr("class", "mes")
    .attr("transform", d => `translate(${xScale0(d.mes)},0)`)
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave)


    // Add the X Axis
    svgPrioridad.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${this.height - margin.top - margin.bottom})`)
    .call(xAxis);
    // Add the Y Axis
    svgPrioridad.append("g")
    .attr("class", "y axis")
    .call(yAxis);

    
    /* Add field1 bars */
    mesSelect.selectAll(".bar.baja")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar baja")
    .style("fill","blue")
    .attr("x", d => xScale1('baja'))
    .attr("y", d => yScale(d.baja))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return this.height - margin.top - margin.bottom - yScale(d.baja)
    })


    /* Add field2 bars */
    mesSelect.selectAll(".bar.media")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar media")
    .style("fill","yellow")
    .attr("x", d => xScale1('media'))
    .attr("y", d => yScale(d.media))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return this.height - margin.top - margin.bottom - yScale(d.media)
    })


    /* Add field3 bars */
    mesSelect.selectAll(".bar.alta")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar alta")
    .style("fill","red")
    .attr("x", d => xScale1('alta'))
    .attr("y", d => yScale(d.alta))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return this.height - margin.top - margin.bottom - yScale(d.alta)
    })


  }

  filtrar(){
    this.dataPromedioSeleccionado = [];
    this.dataPromedio.forEach(element => {
      if(this.etapas.value.includes(element.label)){
        this.dataPromedioSeleccionado.push(element);
      }
    });
    this.eliminarSvg();
    this.width = 900;
    this.createSvgEtapas();
  }

  filtrarPrioridad(){
    console.log("filtrarPrioridad");
    this.dataPrioridadSeleccionado = [];
    this.dataPrioridad.forEach(element => {
      if(this.meses.value.includes(element.mes)){
        this.dataPrioridadSeleccionado.push(element);
      }
    });
    this.eliminarSvgPrioridad();
    this.width = 900;
    this.createSvgPrioridad();
  }
    

  drawChartEtapas(){
      //width
      this.width = this.viewContainerRef.element.nativeElement.getBoundingClientRect().width;
      this.svg.attr("width", this.width);

      //escala x rango

      const xAxis = d3
        .axisBottom(this.xScale)
        .tickSize(0)
        .tickPadding(10);


      this.xAxis.call(xAxis);

      const yAxis = d3
        .axisRight(this.yScale);
      this.yAxis.call(yAxis);

      const line = d3
        .line()
        .x(d => d[0])
        .y(d => d[1])
        .curve(d3.curveMonotoneX);

    //Tooltip
    const tooltip = d3
    .select(this.viewContainerRef.element.nativeElement)
    .select(".linechart")
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
        .html(d.target.__data__.label + "<br/>"  + "Valor: " + d.target.__data__.value)
				.style("left", (d3.pointer(d)[0]) + "px")
      .style("top", (d3.pointer(d)[1] + 180) + "px")
    }

    const mouseleave = (d:any) => {
      console.log(d);
      d3.select(d.target)
      .style("stroke", "none")
      .style("opacity", 0.8)

    tooltip
      .style("opacity", 0)
    d3.select(d.target)
      .style("stroke", "none")
      .style("opacity", 0.8)
    }
    
  
      const points: [number, number][] = this.dataPromedioSeleccionado.map(
        d => [this.xScale(d.label) + this.xScale.bandwidth() / 2, this.yScale(d.value)]
      );
      this.lineGroup.attr("d", line(points))
      .style("stroke", "blue")

      this.dots = this.svgInner
      .selectAll("circle")
      .data(this.dataPromedioSeleccionado)
      .enter()
      .append("circle")
      .attr("cx", (d:any) => this.xScale(d.label) + this.xScale.bandwidth() / 2)
      .attr("cy", (d:any) => this.yScale(d.value))
      .attr("r", 5)
      .style("fill", "red")
      .style("stroke", "black")
      .style("stroke-width", "2px")
      .on("mouseover", mouseover)
      .on("mouseleave", mouseleave)
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
          element.personalAsignado = element.nombrePersonal;
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
    modalMap.componentInstance.reporte = reporte;
    modalMap.componentInstance.singleMarker = true;
  }

  verMapa(){
    let markers: Marker[] = [];
    this.data.forEach(element => {
      markers.push({
        lat: element.latitud,
        lng: element.longitud,
        label: `<b>N° Reporte: </b> ${element.id} <br>
        <b>Descripción: </b> ${element.descripcion} <br>
        <b>Fecha: </b> ${element.fechaCreacion} <br>
        <b>Estado: </b> ${element.estado} <br>`,
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

  eliminarSvg(){
    this.svg.remove();
  }

  eliminarSvgPrioridad(){
    d3.select(".promPrioridad").select("svg").remove();
  }





}
