import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

declare var jQuery:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('loginModal') private closeModal: ElementRef;

  public loading: boolean;
  public failed: boolean;
  public redirectUrl: string;
  public username: string;
  public showProfileButton: boolean;

  constructor(private userService: UserService, private router: Router, public zone: NgZone) { 
    this.redirectUrl = "";
    this.showProfileButton = false;

    this.loadUserInfo();
  }

  ngOnInit(): void {
    
  }

  loadUserInfo(): void {
    var ret = this.userService.getUserProfile();
    
    ret.subscribe(data => {
        this.zone.run(() => 
        {
          this.username = data.body["user"].userName;
          localStorage.setItem("role",  data.body["userRole"][0]);
          this.showProfileButton = true;
        });
      },
      err => { });
  }

  signIn(form: NgForm): void {
    form.value['redirectUrl'] = this.redirectUrl;
    var jsonized = JSON.stringify(form.value);
    
    this.loading = true;
    this.failed = false;
    
    var ret = this.userService.login(jsonized);
    
    ret.subscribe(data => {
        this.loading = false;
        localStorage.setItem("token", data.body["t"]);
        this.username = form.value.username;
        this.showProfileButton = true;
        localStorage.setItem("username", form.value.username);
        this.closeModal.nativeElement.click();
        this.loadUserInfo();
        if (data.body["redirectUrl"] != "")
          this.router.navigateByUrl(data.body["redirectUrl"].toLocaleString());
      },
      err => {
        this.loading = false;
        this.failed = true;
      });
  }

}
