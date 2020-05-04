import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SystemComponent } from './system/system.component';
import { CarComponent } from './car/car.component';
import { AvioComponent } from './avio/avio.component';
import { AvioProfileComponent } from './avio/profile/profile.component';
import { AvioAeroplanesComponent } from './avio/aeroplanes/aeroplanes.component';
import { AvioSeatsComponent } from './avio/aeroplanes/seats/seats.component';
import { AvioFlightsComponent } from './avio/flights/flights.component';
import { AvioReportComponent } from './avio/report/report.component';
import { AvioUserComponent } from './avio/user/user.component';
import { CarVehiclesComponent } from './car/vehicles/vehicles.component';
import { CarOfficesComponent } from './car/offices/offices.component';
import { CarUserComponent } from './car/user/user.component';
import { CarProfileComponent } from './car/profile/profile.component';



@NgModule({
  declarations: [AdminComponent, 
                 SystemComponent, 
                 CarComponent, 
                 AvioComponent, 
                 AvioProfileComponent, 
                 AvioAeroplanesComponent, 
                 AvioSeatsComponent,
                 AvioFlightsComponent,
                 AvioReportComponent,
                 AvioUserComponent,
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
