import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './homepage/user/user.component';
import { FriendsComponent } from './homepage/user/friends/friends.component';
import { NotificationsComponent } from './homepage/user/notifications/notifications.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { RoleGuardService } from './auth/role-guard.service';
import { AuthService } from './auth/auth.service';
import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("token");
}

const JWT_Module_Options : JwtModuleOptions = {
  config: {
    tokenGetter : tokenGetter
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    ProfileComponent,
    SignUpComponent,
    FooterComponent,
    UserComponent,
    FriendsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [
    AuthGuardService,
    RoleGuardService,
    AuthService,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
