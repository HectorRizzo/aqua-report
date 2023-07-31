import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AdministrarMedidoresComponent } from '../../pages/administrar-medidores/administrar-medidores.component';
import { GestionarUsuariosComponent } from '../../pages/gestionar-usuarios/gestionar-usuarios.component';
import { AdministrarReportesComponent } from '../../pages/administrar-reportes/administrar-reportes.component';
import { MapsComponent } from '../../pages/shared/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { CerrarSesionComponent } from 'app/pages/cerrar-sesion/cerrar-sesion.component';


export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'perfil',   component: UserProfileComponent },
    { path: 'medidores',     component: AdministrarMedidoresComponent },
    { path: 'usuarios',     component: GestionarUsuariosComponent },
    { path: 'reportes',          component: AdministrarReportesComponent },
    { path: 'cerrar-sesion',        component: CerrarSesionComponent },
   
];
