import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { AvioComponent } from './avio/avio.component';
import { ProfileComponent } from './avio/profile/profile.component';
import { AeroplanesComponent } from './avio/aeroplanes/aeroplanes.component';
import { SeatsComponent } from './avio/aeroplanes/seats/seats.component';
import { FlightsComponent} from './avio/flights/flights.component';
import { ReportComponent} from './avio/report/report.component';
import { UserComponent} from './avio/user/user.component';

const routes: Routes = [
  { path: 'system', component: SystemComponent },
  { path: 'avio', component: AvioComponent },
  { path: 'avio/profile', component: ProfileComponent },
  { path: 'avio/aeroplanes', component: AeroplanesComponent},
  { path: 'avio/aeroplanes/seats', component: SeatsComponent},
  { path: 'avio/flights', component: FlightsComponent},
  { path: 'avio/report', component: ReportComponent},
  { path: 'avio/user', component: UserComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
