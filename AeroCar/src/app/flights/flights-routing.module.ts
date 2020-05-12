import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsComponent } from './flights.component';
import { FlightReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
    { path: '', component: FlightsComponent, data: { animation: 'isRight' } },
    { path: 'reservation', component: FlightReservationComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsRoutingModule { }
