import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsComponent } from './flights.component';
import { FlightReservationComponent } from './reservation/reservation.component';
import { FlightSeatsComponent } from './reservation/seats/seats.component';
import { FlightDetailsComponent } from './reservation/seats/details/details.component';

const routes: Routes = [
    { path: '', component: FlightsComponent, data: { animation: 'isRight' } },
    { path: 'reservation', component: FlightReservationComponent},
    { path: 'reservation/seats', component: FlightSeatsComponent},
    { path: 'reservation/seats/details', component: FlightDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsRoutingModule { }
