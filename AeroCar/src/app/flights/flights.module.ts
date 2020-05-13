import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsRoutingModule } from './flights-routing.module';

import { FlightsComponent } from './flights.component';
import { FlightReservationComponent } from './reservation/reservation.component';
import { FlightSeatsComponent } from './reservation/seats/seats.component';
import { FlightDetailsComponent } from './reservation/seats/details/details.component';

@NgModule({
  declarations: [FlightsComponent, 
                 FlightReservationComponent,
                 FlightSeatsComponent,
                 FlightDetailsComponent],
  imports: [
    CommonModule,
    FlightsRoutingModule
  ]
})

export class FlightsModule { }
