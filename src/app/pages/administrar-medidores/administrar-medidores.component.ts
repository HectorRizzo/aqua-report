import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AquaReportService } from 'app/services/aquaReport.service';
import * as Chartist from 'chartist';
import { ModalAgregarMedidorComponent } from '../shared/modal-agregar-medidor/modal-agregar-medidor.component';
import { ModalAgregarLecturaComponent } from '../shared/modal-agregar-lectura/modal-agregar-lectura.component';
import Swal from 'sweetalert2';

import * as d3 from 'd3';
import { FormControl } from '@angular/forms';
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

 dataMedidor = [
  { 
    medidor: 'EFC-001',
    mes: 'Enero',
    valor : 100
  },
  {
    medidor: 'EFC-001',
    mes: 'Febrero',
    valor : 200
  },
  {
    medidor: 'EFC-001',
    mes: 'Marzo',
    valor : 300
  },
  {
    medidor: 'EFC-001',
    mes: 'Abril',
    valor : 400
  },
  {
    medidor: 'EFC-002',
    mes: 'Enero',
    valor : 78
  },
  {
    medidor: 'EFC-002',
    mes: 'Febrero',
    valor : 97
  },
  {
    medidor: 'EFC-002',
    mes: 'Marzo',
    valor : 100
  },
  {
    medidor: 'EFC-002',
    mes: 'Abril',
    valor : 34
  },
  {
    medidor: 'EFC-003',
    mes: 'Enero',
    valor : 100
  },
  {
    medidor: 'EFC-003',
    mes: 'Febrero',
    valor : 400
  },
  {
    medidor: 'EFC-003',
    mes: 'Marzo',
    valor : 500
  },
  {
    medidor: 'EFC-003',
    mes: 'Abril',
    valor : 60
  }
];
dataMedidorSeleccionado = [
];
meses = new FormControl('');
listaMeses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];

medidoresDropdown = new FormControl('');
listaMedidores: string[] = ['EFC-001', 'EFC-002', 'EFC-003'];
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
    private modal: NgbModal,
    private viewContainerRef: ViewContainerRef
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
    
    this.dataMedidorSeleccionado = this.dataMedidor.filter((item) => {
      return item.medidor == 'EFC-001';
    }
    );
    this.createSvgEtapas();
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
      .domain([d3.max(this.dataMedidorSeleccionado, d => d.valor), 0])
      .range([0, this.height - 2 * this.margin]);

      //escala x es string
    this.xScale = d3
      .scaleBand()
      .domain(this.dataMedidorSeleccionado.map(d => d.mes))
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
      .html(d.target.__data__.mes + "<br/>"  + "Valor: " + d.target.__data__.valor)
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
  

    const points: [number, number][] = this.dataMedidorSeleccionado.map(
      d => [this.xScale(d.mes) + this.xScale.bandwidth() / 2, this.yScale(d.valor)]
    );
    this.lineGroup.attr("d", line(points))
    .style("stroke", "blue")

    this.dots = this.svgInner
    .selectAll("circle")
    .data(this.dataMedidorSeleccionado)
    .enter()
    .append("circle")
    .attr("cx", (d:any) => this.xScale(d.mes) + this.xScale.bandwidth() / 2)
    .attr("cy", (d:any) => this.yScale(d.valor))
    .attr("r", 5)
    .style("fill", "red")
    .style("stroke", "black")
    .style("stroke-width", "2px")
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave)
}
  filtrarPrioridad(){
    console.log("filtrarPrioridad");
    console.log(this.meses)
    console.log(this.medidoresDropdown)
    this.dataMedidorSeleccionado = [];
    this.dataMedidor.forEach(element => {
      if(this.meses.value.includes(element.mes)){
        if(this.medidoresDropdown.value.includes(element.medidor)){
          this.dataMedidorSeleccionado.push(element);
        }
      }
    });
    this.eliminarSvg();
    this.width = 900;
    this.createSvgEtapas();
  }
  eliminarSvg(){
    this.svg.remove();
  }
    

}
