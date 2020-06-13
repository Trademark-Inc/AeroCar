import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  friends: any;
  dashboardRoute: any;

  public loading: boolean;
  public success: boolean;
  public failed: boolean;

  constructor(private userService: UserService, private router: Router, public zone: NgZone) {
    this.loadUserProfile();
  }

  ngOnInit(): void {
  }

  loadUserProfile(): void {
    var ret = this.userService.getUserProfile();
    
    ret.subscribe(data => {
        this.zone.run(() => 
        {
          this.profile = data.body["user"];

          if (data.body["userRole"][0] === "RegularUser") {
            this.dashboardRoute = "/dashboard";
          } else if (data.body["userRole"][0] === "AvioAdmin") {
            this.dashboardRoute = "/admin/avio";
          } else if (data.body["userRole"][0] === "CarAdmin") {
            this.dashboardRoute = "/admin/car";
          } else {
            this.dashboardRoute = "/admin/system";
          }
        });
      },
      err => {
        this.router.navigateByUrl("");    
      });
  }

  loadFriends(): void {
    var ret = this.userService.getFriends();
    
    ret.subscribe(data => {
        this.zone.run(() => 
        {
          this.friends = data.body;
        });
      },
      err => {
        this.router.navigateByUrl("");
      });
  }

  signOut(): void {
    var ret = this.userService.logout();
    
    ret.subscribe(data => {
        localStorage.clear();
        this.router.navigateByUrl("");
        window.location.reload();
      },
      err => { });
  }

  updateProfile(form: NgForm): void {
    var jsonized = JSON.stringify(form.value);

    this.loading = true;
    this.success = false;
    this.failed = false;
    
    var ret = this.userService.updateUserProfile(jsonized);
    
    ret.subscribe(data => {
        this.loading = false;
        this.success = true;
      },
      err => {
        this.loading = false;
        this.failed = true;
      });
  }

  refresh(): void {
    this.loading = false;
    this.failed = false;
    this.success = false;
    this.loadUserProfile();
  }

  addFriend(form: NgForm): void {
    var ret = this.userService.addFriend(form.value.username);
    ret.subscribe(data => { this.loadFriends(); }, err => { });
  }

  removeFriend(form: NgForm): void {
    var ret = this.userService.removeFriend(form.value.username);
    ret.subscribe(data => { this.loadFriends(); }, err => { });
  }

}
