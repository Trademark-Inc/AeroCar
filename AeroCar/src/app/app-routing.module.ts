import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FlightsComponent } from './flights/flights.component';


const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'signup', component: SignUpComponent, data: { animation: 'isLeft' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'isRight' } },
  { path: 'flights', component: FlightsComponent, data: { animation: 'isLeft' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
