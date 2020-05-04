import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { AvioComponent } from './avio/avio.component';
import { ProfileComponent } from './avio/profile/profile.component';
import { AeroplanesComponent } from './avio/aeroplanes/aeroplanes.component';
import { SeatsComponent } from './avio/aeroplanes/seats/seats.component';
import { CarComponent } from './car/car.component';
import { CarProfileComponent } from './car/profile/profile.component';
import { CarVehiclesComponent } from './car/vehicles/vehicles.component';
import { CarOfficesComponent as CarOfficesComponent } from './car/offices/offices.component';
import { CarUserComponent } from './car/user/user.component';

const routes: Routes = [
  { path: 'system', component: SystemComponent },
  { path: 'avio', component: AvioComponent },
  { path: 'avio/profile', component: ProfileComponent },
  { path: 'avio/aeroplanes', component: AeroplanesComponent},
  { path: 'avio/aeroplanes/seats', component: SeatsComponent},
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
