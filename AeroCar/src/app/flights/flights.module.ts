import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsRoutingModule } from './flights-routing.module';

import { FlightsComponent } from './flights.component';
import { FlightReservationComponent } from './reservation/reservation.component';

@NgModule({
  declarations: [FlightsComponent, 
                 FlightReservationComponent],
  imports: [
    CommonModule,
    FlightsRoutingModule
  ]
})

export class FlightsModule { }
