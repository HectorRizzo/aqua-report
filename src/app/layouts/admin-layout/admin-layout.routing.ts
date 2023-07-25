import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AdministrarMedidoresComponent } from '../../pages/administrar-medidores/administrar-medidores.component';
import { GestionarUsuariosComponent } from '../../pages/gestionar-usuarios/gestionar-usuarios.component';
import { AdministrarReportesComponent } from '../../pages/administrar-reportes/administrar-reportes.component';
import { MapsComponent } from '../../pages/shared/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: AdministrarMedidoresComponent },
    { path: 'typography',     component: GestionarUsuariosComponent },
    { path: 'icons',          component: AdministrarReportesComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
