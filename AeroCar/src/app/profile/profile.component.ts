import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  friends: any;

  public loading: boolean;
  public success: boolean;
  public failed: boolean;

  constructor(public http: HttpClient, private router: Router, public zone: NgZone) {
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
          this.profile = data.body["user"];
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.router.navigateByUrl("");    
      });
  }

  ngOnInit(): void {
  }

  loadFriends(): void {
    var ret = this.http.get("http://localhost:62541/api/user/friends", { 
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
          this.friends = data.body;
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.router.navigateByUrl("");
      });
  }

  signOut(): void {
    var ret = this.http.post("http://localhost:62541/api/user/logout", null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        localStorage.clear();
        this.router.navigateByUrl("");
        window.location.reload();
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  updateProfile(form: NgForm): void {
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    this.loading = true;
    this.success = false;
    this.failed = false;
    var ret = this.http.post("http://localhost:62541/api/user/update", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
        this.loading = false;
        this.success = true;
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading = false;
        this.failed = true;
      });
  }

  refresh(): void {
    window.location.reload();
  }

  addFriend(form: NgForm): void {
    var ret = this.http.post("http://localhost:62541/api/user/friends/add/" + form.value.username, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(form.value);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  removeFriend(form: NgForm): void {
    var ret = this.http.post("http://localhost:62541/api/user/friends/remove/" + form.value.username, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(form.value);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

}
