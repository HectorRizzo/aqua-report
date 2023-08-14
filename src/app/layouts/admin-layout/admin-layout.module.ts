import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { GestionarUsuariosComponent } from '../../pages/gestionar-usuarios/gestionar-usuarios.component';
import { AdministrarReportesComponent } from '../../pages/administrar-reportes/administrar-reportes.component';
import { MapsComponent } from '../../pages/shared/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MAT_DATE_LOCALE, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { AdministrarMedidoresComponent } from 'app/pages/administrar-medidores/administrar-medidores.component';
import { ModalMapaComponent } from 'app/pages/shared/modal-mapa/modal-mapa.component';
import { ModalUsuarioComponent } from 'app/pages/shared/modal-usuario/modal-usuario.component';
import { LoadingComponent } from 'app/pages/shared/loading/loading.component';
import { ModalAgregarUsuarioUsuarioComponent } from 'app/pages/shared/modal-agregar-usuario/modal-agregar-usuario.component';
import { ModalReporteComponent } from 'app/pages/shared/modal-reporte/modal-reporte.component';
import { ModalAgregarLecturaComponent } from 'app/pages/shared/modal-agregar-lectura/modal-agregar-lectura.component';
import { ModalAgregarMedidorComponent } from 'app/pages/shared/modal-agregar-medidor/modal-agregar-medidor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from 'app/pages/login/login.component';
import { CerrarSesionComponent } from 'app/pages/cerrar-sesion/cerrar-sesion.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    AdministrarMedidoresComponent,
    GestionarUsuariosComponent,
    AdministrarReportesComponent,
    MapsComponent,
    LoadingComponent,
    ModalMapaComponent,
    ModalAgregarUsuarioUsuarioComponent,
    ModalReporteComponent,
    ModalUsuarioComponent,
    ModalAgregarLecturaComponent,
    LoginComponent,
    ModalAgregarMedidorComponent,
    CerrarSesionComponent,
    NotificationsComponent,
  ]
})

export class AdminLayoutModule {}
