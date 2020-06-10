import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './homepage/user/user.component';
import { FriendsComponent } from './homepage/user/friends/friends.component';
import { NotificationsComponent } from './homepage/user/notifications/notifications.component';
import { Router, CanActivate} from '@angular/router';
import { AuthGuardService as AuthGuard} from './auth/auth-guard.service';
import { RoleGuardService as RoleGuard } from './auth/role-guard.service';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'signup', component: SignUpComponent, data: { animation: 'isRight' } },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard], data: { animation: 'isLeft'} },
  { path: 'flights', loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule), data: { animation: 'isLeft' } },
  { path: 'cars', loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule), data: { animation: 'isRight' } },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], data: { animation: 'isLeft'} },
  { path: 'dashboard', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'dashboard/friends', component: FriendsComponent, canActivate: [AuthGuard]},
  { path: 'dashboard/notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
