import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
