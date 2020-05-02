import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarsComponent } from './cars/cars.component';
import { FlightsComponent } from './flights/flights.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'signup', component: SignUpComponent, data: { animation: 'isRight' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'isLeft' }  },
  { path: 'cars', component: CarsComponent, data: { animation: 'isRight'} },
  { path: 'flights', component: FlightsComponent, data: { animation: 'isLeft' } },
  { path: 'admin', component: AdminComponent, data: { animation: 'isRight' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
