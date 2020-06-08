import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: any;

  constructor(public http: HttpClient, private router: Router, public zone: NgZone) {
    this.loadFriends();
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

  addFriend(form: NgForm): void {
    var ret = this.http.post("http://localhost:62541/api/user/friends/add/" + form.value.username, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(form.value);
        this.refresh();
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
        this.refresh();
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  refresh(): void {
    window.location.reload();
  }

}
