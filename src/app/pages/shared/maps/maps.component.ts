import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import 'leaflet';
import 'leaflet-routing-machine';
declare let L;

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
export const DEFAULT_LAT = -2.146398535810503;
export const DEFAULT_LON = -79.9661883742298;
export const TITULO = 'Proyecto';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
 
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    private map:any;
    @Input() lat: number = DEFAULT_LAT;
    @Input() lon: number = DEFAULT_LON;
    @Input() markers: Marker[] = [];
    @Input() singleMarker: boolean = true;
    @Input() titulo: string = TITULO ;
    @Input() zoom: number = 18;
    @Input() reporte: any;
    @Input() permitirSeleccionar: boolean = false;

    @Output() latLon = new EventEmitter<any>();

    latSeleccionada;
    lonSeleccionada;
   
    constructor(
      private activeModal: NgbActiveModal,
    ) {
    }
   
    ngOnInit() {
      this.initMap();
    }
   
   
   
    initMap() {

        //configuración del mapa
        this.map = L.map('map', {
          center: [this.lat, this.lon],
          attributionControl: false,
          zoom: this.zoom
        });
   
        //iconos personalizados
        var iconDefault = L.icon({
          iconRetinaUrl,
          shadowUrl,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        });
       L.Marker.prototype.options.icon = iconDefault;
   
        //titulo
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 100,
          attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
        });
   
        //marca  

        
        //agregar multiples marcas

        

        if(this.permitirSeleccionar){
          this.map.on('click', this.setearMarcador.bind(this));
        }else{
          if(this.singleMarker){
            const mark = L.marker([this.lat, this.lon]).bindPopup(
              `<b>N° Reporte: </b> ${this.reporte.id} <br>
              <b>Descripción: </b> ${this.reporte.descripcion} <br>
              <b>Fecha: </b> ${this.reporte.fechaCreacion} <br>
              <b>Estado: </b> ${this.reporte.estado} <br>`
            );
            mark.addTo(this.map);
          }else{
            this.markers.forEach((marker: Marker) => {
              console.log(marker);
              const m = L.marker([marker.lat, marker.lng], { draggable: marker.draggable }).bindPopup(
                `${marker.label}`);
              m.addTo(this.map);
            });
          }
        }
   

        tiles.addTo(this.map);
    }

    setearMarcador(e){
      //eliminar marcador anterior
        this.map.eachLayer((layer) => {
            if(layer.options.icon){
                this.map.removeLayer(layer);
            }
        });
      console.log(e);
        this.latSeleccionada = e.latlng.lat;
        this.lonSeleccionada = e.latlng.lng;
        let mark = L.marker([this.latSeleccionada, this.lonSeleccionada]).bindPopup(
          `<b>Latitud: </b> ${this.latSeleccionada} <br>
          <b>Longitud: </b> ${this.lonSeleccionada} <br>`
        );
        mark.addTo(this.map);
    }

    closeModal() {
        this.activeModal.close();
    }

    guardar(){
        this.latLon.emit({lat: this.latSeleccionada, lon: this.lonSeleccionada});
        this.closeModal();
    }


  }
