import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { AvioComponent } from './avio/avio.component';
import { AvioProfileComponent } from './avio/profile/profile.component';
import { AvioAeroplanesComponent } from './avio/aeroplanes/aeroplanes.component';
import { AvioSeatsComponent } from './avio/aeroplanes/seats/seats.component';
import { AvioFlightsComponent} from './avio/flights/flights.component';
import { AvioReportComponent} from './avio/report/report.component';
import { AvioUserComponent} from './avio/user/user.component';

const routes: Routes = [
  { path: 'system', component: SystemComponent },
  { path: 'avio', component: AvioComponent },
  { path: 'avio/profile', component: AvioProfileComponent },
  { path: 'avio/aeroplanes', component: AvioAeroplanesComponent},
  { path: 'avio/aeroplanes/seats', component: AvioSeatsComponent},
  { path: 'avio/flights', component: AvioFlightsComponent},
  { path: 'avio/report', component: AvioReportComponent},
  { path: 'avio/user', component: AvioUserComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
