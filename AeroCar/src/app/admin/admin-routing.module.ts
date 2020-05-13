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

const routes: Routes = [
  { path: 'system', component: SystemComponent },
  { path: 'system/register/avio', component: SystemAvioComponent },
  { path: 'system/register/car', component: SystemCarComponent },
  { path: 'system/register/admin', component: SystemAdminComponent },
  { path: 'avio', component: AvioComponent },
  { path: 'avio/profile', component: AvioProfileComponent },
  { path: 'avio/aeroplanes', component: AvioAeroplanesComponent},
  { path: 'avio/aeroplanes/seats', component: AvioSeatsComponent},
  { path: 'avio/flights', component: AvioFlightsComponent},
  { path: 'avio/report', component: AvioReportComponent},
  { path: 'avio/user', component: AvioUserComponent},
  { path: 'car', component: CarComponent, data: { animation: 'isLeft' } },
  { path: 'car/profile', component: CarProfileComponent, data: { animation: 'isRight' } },
  { path: 'car/vehicles', component: CarVehiclesComponent, data: { animation: 'isRight' } },
  { path: 'car/offices', component: CarOfficesComponent, data: { animation: 'isRight' } },
  { path: 'car/user', component: CarUserComponent, data: { animation: 'isRight' } }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
