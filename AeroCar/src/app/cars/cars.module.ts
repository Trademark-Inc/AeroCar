import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsRoutingModule } from './cars-routing.module';

import { CarsComponent } from './cars.component';
import { CarsProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [CarsComponent, CarsProfileComponent],
  imports: [
    CommonModule,
    CarsRoutingModule
  ]
})

export class CarsModule { }
