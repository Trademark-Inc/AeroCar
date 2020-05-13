import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars.component';
import { CarsProfileComponent } from './profile/profile.component';

const routes: Routes = [
    { path: '', component: CarsComponent, data: { animation: 'isRight' } },
    { path: 'profile', component: CarsProfileComponent, data: { animation: 'isLeft' } }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
