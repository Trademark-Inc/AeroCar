import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SystemComponent } from './system/system.component';



@NgModule({
  declarations: [AdminComponent, SystemComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
