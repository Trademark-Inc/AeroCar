import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { SystemAvioComponent } from './system/register/avio/avio.component';
import { SystemCarComponent } from './system/register/car/car.component';
import { SystemAdminComponent } from './system/register/admin/admin.component';
import { AvioComponent } from './avio/avio.component';
import { AvioProfileComponent } from './avio/profile/profile.component';
import { AvioAeroplanesComponent } from './avio/aeroplanes/aeroplanes.component';
import { AvioSeatsComponent } from './avio/aeroplanes/seats/seats.component';
import { AvioFlightsComponent} from './avio/flights/flights.component';
import { AvioReportComponent} from './avio/report/report.component';
import { AvioUserComponent} from './avio/user/user.component';
import { CarComponent } from './car/car.component';
import { CarProfileComponent } from './car/profile/profile.component';
import { CarVehiclesComponent } from './car/vehicles/vehicles.component';
import { CarOfficesComponent as CarOfficesComponent } from './car/offices/offices.component';
import { CarUserComponent } from './car/user/user.component';
import { RoleGuardService as RoleGurad } from '../auth/role-guard.service';

const routes: Routes = [
  { path: 'system', component: SystemComponent, canActivate: [RoleGurad], data: {expectedRole: 'SystemAdmin'} },
  { path: 'system/register/avio', component: SystemAvioComponent, canActivate: [RoleGurad], data: {expectedRole: 'SystemAdmin'} },
  { path: 'system/register/car', component: SystemCarComponent, canActivate: [RoleGurad], data: {expectedRole: 'SystemAdmin'} },
  { path: 'system/register/admin', component: SystemAdminComponent, canActivate: [RoleGurad], data: {expectedRole: 'SystemAdmin'} },
  { path: 'avio', component: AvioComponent, canActivate: [RoleGurad], data: {expectedRole: 'AvioAdmin'} },
  { path: 'avio/profile', component: AvioProfileComponent, canActivate: [RoleGurad], data: {expectedRole: 'AvioAdmin'} },
  { path: 'avio/aeroplanes', component: AvioAeroplanesComponent, canActivate: [RoleGurad], data: {expectedRole: 'AvioAdmin'}},
  { path: 'avio/aeroplanes/seats/:id', component: AvioSeatsComponent, canActivate: [RoleGurad], data: {expectedRole: 'AvioAdmin'}},
  { path: 'avio/flights', component: AvioFlightsComponent, canActivate: [RoleGurad], data: {expectedRole: 'AvioAdmin'}},
  { path: 'avio/report', component: AvioReportComponent, canActivate: [RoleGurad], data: {expectedRole: 'AvioAdmin'}},
  { path: 'avio/user', component: AvioUserComponent, canActivate: [RoleGurad], data: {expectedRole: 'AvioAdmin'}},
  { path: 'car', component: CarComponent, canActivate: [RoleGurad], data: { animation: 'isLeft' } },
  { path: 'car/profile', component: CarProfileComponent, canActivate: [RoleGurad], data: { animation: 'isRight', expectedRole: 'CarAdmin' } },
  { path: 'car/vehicles', component: CarVehiclesComponent, canActivate: [RoleGurad], data: { animation: 'isRight', expectedRole: 'CarAdmin' } },
  { path: 'car/offices', component: CarOfficesComponent, canActivate: [RoleGurad], data: { animation: 'isRight', expectedRole: 'CarAdmin' } },
  { path: 'car/user', component: CarUserComponent, canActivate: [RoleGurad], data: { animation: 'isRight', expectedRole: 'CarAdmin' } }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
