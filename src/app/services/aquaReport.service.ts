import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { param } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class AquaReportService {

    showConfirm: Subject<any>;
    loadData: Subject<any>;
    constructor(private apiService: ApiService, private http: HttpClient, private router: Router,) {
        this.showConfirm = new Subject<any>();
        this.loadData = new Subject<any>();
    }

    getUsuario(){
        return JSON.parse(sessionStorage.getItem('usuarioAqua'));
    }

    setUsuario(usuario){
        sessionStorage.setItem('usuarioAqua', JSON.stringify(usuario));
    }

    //Reportes

    getReportes(query){
        return this.apiService.ApiCall(`getReportes?fechaInicio=${query.fechaInicio}&fechaFin=${query.fechaFin}&estado=${query.estado}`,'GET',null);
    }
    
    getReportesFinalizados(){
        return this.apiService.ApiCall(`getReportesFinalizados`,'GET',null);
    }
    
    getReportesPendientes(){
        return this.apiService.ApiCall(`getReportesPendientes`,'GET',null);
    }

    getReportesNoAsignados(){
        return this.apiService.ApiCall(`getReportesNoAsignados`,'GET',null);
    }

    asignarPersonal(idReporte, body){
        return this.apiService.ApiCall(`asignarReporte/${idReporte}`,'PUT',body);
    }

    deleteReporte(id){
        return this.apiService.ApiCall(`eliminarReporte/${id}`,'DELETE',null);
    }
    getUltimosReportes(query){
        return this.apiService.ApiCall(`getUltimosReportes?cantidad=${query.cantidad}`,'GET',null);
    }

    getTotalesReportes(){
        return this.apiService.ApiCall(`getTotalReportes`,'GET',null);
    }

    //usuarios

    getUsuarios(){
        return this.apiService.ApiCall(`getUsuarios`,'GET',null);
    }
    
    postUsuario(usuario){
        return this.apiService.ApiCall(`agregarUsuario`,'POST',usuario);
    }

    updateUsuario( usuario, id){
        return this.apiService.ApiCall(`editarUsuario/${id}`,'PUT',usuario );
    }

    updatePerfil( usuario, id){
        return this.apiService.ApiCall(`editarPerfil/${id}`,'PUT',usuario );
    }

    deleteUsuario(id){
        return this.apiService.ApiCall(`eliminarUsuario/${id}`,'DELETE',null);
    }

    getPersonal(){
        return this.apiService.ApiCall(`getPersonal`,'GET',null);
    }

    getTiposUsuario(){
        return this.apiService.ApiCall(`getTiposUsuario`,'GET',null);
    }

    getPersonalLectura(){
        return this.apiService.ApiCall(`getPersonalLectura`,'GET',null);
    }

    //medidores
    getMedidores(){
        return this.apiService.ApiCall(`getMedidores`,'GET',null);
    }

    crearMedidor(medidor){
        return this.apiService.ApiCall(`agregarMedidor`,'POST',medidor);
    }
    
    getLecturas(){
        return this.apiService.ApiCall(`getLecturas`,'GET',null);
    }

    crearLectura(lectura){
        return this.apiService.ApiCall(`agregarLectura`,'POST',lectura);
    }

    actualizarLectura(lectura, id){
        return this.apiService.ApiCall(`reasignarUsuarioLectura/${id}`,'PUT',lectura);
    }

    eliminarLectura(id){
        return this.apiService.ApiCall(`eliminarLectura/${id}`,'DELETE',null);
    }

    //login
    login(body){
        return this.apiService.ApiCall(`login`,'POST',body);
    }

    //graficos 
    getReportesPorMes(query){
        return this.apiService.ApiCall(`getReportesXMes?fechaInicio=${query.fechaInicio}&fechaFin=${query.fechaFin}`,'GET',null);
    }

    getReportesPorPrioridad(query){
        return this.apiService.ApiCall(`getReportesXMesPrioridad?fechaInicio=${query.fechaInicio}&fechaFin=${query.fechaFin}`,'GET',null);
    }

    getPromedioEtapa(){
        return this.apiService.ApiCall(`getDiasPromedio`,'GET',null);
    }
    getEvolucionMedidores(query){
        return this.apiService.ApiCall(`getEvolucionMedidores?fechaInicio=${query.fechaInicio}&fechaFin=${query.fechaFin}&idMedidor=${query.idMedidor}`,'GET',null);

    }

}