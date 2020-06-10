import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  flightInvitations: any;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) { 
    this.loadInvitations();
  }

  ngOnInit(): void {
  }

  loadInvitations(): void {
    var ret = this.http.get("http://localhost:62541/api/user/flight/invitations", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.flightInvitations = data.body["flightInvitations"];
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  accept(invitationId: number, flightId: number): void {
    
    var data = {
      "invitationId": invitationId,
      "accepted": true
    };

    var jsonized = JSON.stringify(data);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/invite/response", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.router.navigateByUrl("/flights/reservation/" + flightId);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });

  }

  reject(invitationId: number): void {

    var data = {
      "invitationId": invitationId,
      "accepted": true
    };

    var jsonized = JSON.stringify(data);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/invite/response", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.loadInvitations();
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });

  }

}
