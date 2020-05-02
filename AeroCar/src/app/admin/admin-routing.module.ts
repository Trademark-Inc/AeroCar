import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { AdminComponent } from './admin.component';
import { CarComponent } from './car/car.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'system', component: SystemComponent },
  { path: 'car', component: CarComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
