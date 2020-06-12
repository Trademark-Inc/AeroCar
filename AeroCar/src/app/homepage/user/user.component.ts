import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  profile: any;
  flightsHistory: any;
  carsHistory: any;

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

  loadFlightsHistory(): void {
    console.log("LOADING FLIGHTS HISTORY");
    var ret = this.http.get("http://localhost:62541/api/user/history/flights", { 
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
          this.flightsHistory = data.body["flightsHistory"];
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  loadCarsHistory(): void {
    console.log("LOADING FLIGHTS HISTORY");
    var ret = this.http.get("http://localhost:62541/api/user/history/cars", { 
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
          this.carsHistory = data.body["carsHistory"];
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  loadFlightsReservations(): void {
    console.log("LOADING FLIGHTS HISTORY");
    var ret = this.http.get("http://localhost:62541/api/user/reservations/flights", { 
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
          this.flightsHistory = data.body["flightsHistory"];
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  loadCarsReservations(): void {
    console.log("LOADING FLIGHTS HISTORY");
    var ret = this.http.get("http://localhost:62541/api/user/reservations/cars", { 
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
          this.carsHistory = data.body["carsHistory"];
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  cancelReservationFlight(form: NgForm): void {
    var id = form.value["reservationId"];
    console.log(form.value);
    var ret = this.http.get("http://localhost:62541/api/reservation/flight/remove/" + id, {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.loadFlightsReservations();
      });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  cancelReservationCar(form: NgForm): void {
    var id = form.value["reservationId"];
    console.log(form.value);
    var ret = this.http.get("http://localhost:62541/api/reservation/car/remove/" + id, {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.loadCarsReservations();
      });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  rateAvioFlight(form: NgForm, id: number): void {

    form.value.ratingAvioCompany = parseInt(form.value.ratingAvioCompany);
    form.value.ratingFlight = parseInt(form.value.ratingFlight);

    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/user/rate/" + id, jsonized, { 
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
}