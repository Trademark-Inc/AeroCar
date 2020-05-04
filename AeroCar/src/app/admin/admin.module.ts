import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SystemComponent } from './system/system.component';
import { CarComponent } from './car/car.component';
import { AvioComponent } from './avio/avio.component';
import { ProfileComponent } from './avio/profile/profile.component';
import { AeroplanesComponent } from './avio/aeroplanes/aeroplanes.component';
import { SeatsComponent } from './avio/aeroplanes/seats/seats.component';
import { CarVehiclesComponent } from './car/vehicles/vehicles.component';
import { CarOfficesComponent } from './car/offices/offices.component';
import { CarUserComponent } from './car/user/user.component';
import { CarProfileComponent } from './car/profile/profile.component';
import { FlightsComponent } from './avio/flights/flights.component';
import { ReportComponent } from './avio/report/report.component';
import { UserComponent } from './avio/user/user.component';



@NgModule({
  declarations: [AdminComponent, 
                 SystemComponent, 
                 CarComponent, 
                 AvioComponent, 
                 ProfileComponent, 
                 AeroplanesComponent, 
                 SeatsComponent,
                 FlightsComponent,
                 ReportComponent,
                 UserComponent,
                 CarProfileComponent, 
                 CarVehiclesComponent, 
                 CarOfficesComponent, 
                 CarUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
