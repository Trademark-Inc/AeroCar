import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsRoutingModule } from './cars-routing.module';

import { CarsComponent } from './cars.component';
import { CarsProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [CarsComponent, CarsProfileComponent],
  imports: [
    CommonModule,
    CarsRoutingModule,
    FormsModule
  ]
})

export class CarsModule { }
