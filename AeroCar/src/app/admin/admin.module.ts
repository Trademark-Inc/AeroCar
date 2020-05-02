import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SystemComponent } from './system/system.component';
import { CarComponent } from './car/car.component';



@NgModule({
  declarations: [AdminComponent, SystemComponent, CarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
