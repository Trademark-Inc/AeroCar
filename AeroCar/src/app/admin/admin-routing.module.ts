import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { AvioComponent } from './avio/avio.component';
import { ProfileComponent } from './avio/profile/profile.component';
import { AeroplanesComponent } from './avio/aeroplanes/aeroplanes.component';
import { SeatsComponent } from './avio/aeroplanes/seats/seats.component';

const routes: Routes = [
  { path: 'system', component: SystemComponent },
  { path: 'avio', component: AvioComponent },
  { path: 'avio/profile', component: ProfileComponent },
  { path: 'avio/aeroplanes', component: AeroplanesComponent},
  { path: 'avio/aeroplanes/seats', component: SeatsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
