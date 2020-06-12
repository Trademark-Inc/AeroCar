import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  profile: any;
  flightsHistory: any;
  carsHistory: any;
  flightRate: any;

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
        });
      },
      err => {
        this.router.navigateByUrl("");
      });
  }

  loadFlightsHistory(): void {
    var ret = this.userService.getFlightHistory();
    
    ret.subscribe(data => {
        this.zone.run(() => 
        {
          this.flightsHistory = data.body["flightsHistory"];
        });
      },
      err => {
      });
  }

  loadCarsHistory(): void {
    var ret = this.userService.getCarsHistory();
    
    ret.subscribe(data => {
        this.zone.run(() => 
        {
          this.carsHistory = data.body["carsHistory"];
        });
      },
      err => {
      });
  }

  loadFlightsReservations(): void {
   var ret = this.userService.getFlightReservations();
   
   ret.subscribe(data => {
        this.zone.run(() => 
        {
          this.flightsHistory = data.body["flightsHistory"];
        });
      },
      err => {
      });
  }

  loadCarsReservations(): void {
    var ret = this.userService.getCarReservations();
    
    ret.subscribe(data => {
        this.zone.run(() => 
        {
          this.carsHistory = data.body["carsHistory"];
        });
      },
      err => {
      });
  }

  cancelReservationFlight(form: NgForm): void {
    console.log(form.value);
    var id = parseInt(form.value["reservationId"]);
    var ret = this.userService.cancelFlightReservation(id);
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.loadFlightsReservations();
      });
      },
      err => {
      });
  }

  cancelReservationCar(form: NgForm): void {
    var id = parseInt(form.value["reservationId"]);
    var ret = this.userService.cancelCarReservation(id);
    ret.subscribe(data => {
        this.zone.run(() => {
          this.loadCarsReservations();
      });
      },
      err => {
      });
  }

  loadRateableFlights(): void {
    var ret = this.userService.getRateableFlights();
    
    ret.subscribe(data => {
        this.zone.run(() => 
        {
          this.flightRate = data.body["flightsHistory"];
        });
      },
      err => {
      });
  }

  rateAvioFlight(form: NgForm, id: number): void {

    form.value.ratingAvioCompany = parseInt(form.value.ratingAvioCompany);
    form.value.ratingFlight = parseInt(form.value.ratingFlight);

    var jsonized = JSON.stringify(form.value);
    var ret = this.userService.rateAvioFlight(jsonized, id);
    
    ret.subscribe(data => {
      },
      err => {
      });
  }

}