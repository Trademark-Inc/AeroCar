import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SystemComponent } from './system/system.component';
import { AvioComponent } from './avio/avio.component';
import { ProfileComponent } from './avio/profile/profile.component';
import { AeroplanesComponent } from './avio/aeroplanes/aeroplanes.component';
import { SeatsComponent } from './avio/aeroplanes/seats/seats.component';



@NgModule({
  declarations: [AdminComponent, SystemComponent, AvioComponent, ProfileComponent, AeroplanesComponent, SeatsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
