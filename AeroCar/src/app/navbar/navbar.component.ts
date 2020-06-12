import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(public http: HttpClient, private router: Router, public zone: NgZone) { 
    this.redirectUrl = "";
    this.showProfileButton = false;

    this.loadUserInfo();
  }

  ngOnInit(): void {
    
  }

  loadUserInfo(): void {
    var ret = this.http.get("http://localhost:62541/api/user/current", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => 
        {
          this.username = data.body["user"].userName;
          localStorage.setItem("role",  data.body["userRole"][0]);
          console.log(localStorage);
          this.showProfileButton = true;
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  signIn(form: NgForm): void {
    console.log(form);
    form.value['redirectUrl'] = this.redirectUrl;
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    this.loading = true;
    this.failed = false;
    var ret = this.http.post("http://localhost:62541/api/user/login", jsonized, { 
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.loading = false;
        localStorage.setItem("token", data.body["t"]);
        console.log(form.value);
        this.username = form.value.username;
        this.showProfileButton = true;
        localStorage.setItem("username", form.value.username);
        this.closeModal.nativeElement.click();
        this.loadUserInfo();
        if (data.body["redirectUrl"] != "")
          this.router.navigateByUrl(data.body["redirectUrl"].toLocaleString());
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading = false;
        this.failed = true;
      });
    console.log(ret);
  }

}
