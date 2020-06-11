import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  @ViewChild('confirmModal') private confirmModal: ElementRef;

  reservationId: any;
  reservation: any;
  id: any;
  flight: any;
  friends: any;

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private zone: NgZone) {
    this.reservationId = this.route.snapshot.paramMap.get('reservationId');
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadReservationData();
  }

  ngOnInit(): void {
  }

  loadReservationData(): void {
    var ret = this.http.get("http://localhost:62541/api/reservation/flight/" + this.reservationId, {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.reservation = data.body["reservation"];
      });
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.router.navigateByUrl("/flights");
      });

      var ret = this.http.get("http://localhost:62541/api/flight/" + this.id, {
        headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")},
        observe: 'response',
        withCredentials: true,
        responseType: 'json' }).subscribe(data => {
          console.log("DATA");
          console.log(data);
          console.log(data.body);
          this.zone.run(() => {
            this.flight = data.body["flight"];
        });
        },
        err => {
          console.log("ERROR");
          console.log(err);
          this.router.navigateByUrl("/flights");
        });
  }

  confirm(form: NgForm): void {

    var data = {
      "reservationId": parseInt(this.reservationId),
      "name": form.value["name"],
      "surname": form.value["surname"],
      "passport": form.value["passport"],
    };

    console.log(form.value);
    var jsonized = JSON.stringify(data);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/step/3", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  cancel(): void {
    var ret = this.http.get("http://localhost:62541/api/reservation/flight/remove/" + this.reservationId, {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.router.navigateByUrl("/flights");
      });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  loadFriends(): void {
    console.log("FRIENDS");
    var ret = this.http.get("http://localhost:62541/api/user/friends", {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.friends = data.body;
      });
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.router.navigateByUrl("/flights");
      });
  }

  invite(form: NgForm): void {

    var data = {
      "flightId": parseInt(this.id),
      "id": parseInt(this.reservationId),
      "friendUsername": form.value["username"]
    };

    console.log(form.value);
    var jsonized = JSON.stringify(data);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/invite", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  reserve(): void {
    this.router.navigateByUrl("/flights/reservation/" + this.id);
  }

}
