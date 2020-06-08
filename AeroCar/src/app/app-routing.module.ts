import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './homepage/user/user.component';
import { FriendsComponent } from './homepage/user/friends/friends.component';
import { NotificationsComponent } from './homepage/user/notifications/notifications.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'signup', component: SignUpComponent, data: { animation: 'isRight' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'isLeft' }  },
  { path: 'flights', loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule), data: { animation: 'isLeft' } },
  { path: 'cars', loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule), data: { animation: 'isRight' } },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), data: { animation: 'isLeft' } },
  { path: 'dashboard', component: UserComponent},
  { path: 'dashboard/friends', component: FriendsComponent},
  { path: 'dashboard/notifications', component: NotificationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
