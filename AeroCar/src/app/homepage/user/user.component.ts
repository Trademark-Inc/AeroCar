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
  vehicleRate: any;

  public loading1: boolean;
  public failed1: boolean;
  public success1: boolean;
  public errorCancelReservationFlight: string;
  public errorCancelReservationFlightInfo: string;

  public loading2: boolean;
  public failed2: boolean;
  public success2: boolean;
  public errorCancelReservationVehicle: string;
  public errorCancelReservationVehicleInfo: string;

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

  refreshBonusPoints(): void {
    var ret = this.userService.refreshBonusPoints();
  
    ret.subscribe(data => {
      this.loadUserProfile();
    },
    err => { });
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
    this.loading1 = true;
    this.failed1 = false;
    this.success1 = false;

    var id = parseInt(form.value["reservationId"]);
    var ret = this.userService.cancelFlightReservation(id);
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.loadFlightsReservations();
      });
        this.loading1 = false;
        this.success1 = true;
      },
      err => {
        this.loading1 = false;
        this.failed1 = true;
        this.errorCancelReservationFlight = err.error;
        this.errorCancelReservationFlightInfo = err.status + " " + err.statusText;
      });
  }

  cancelReservationCar(form: NgForm): void {
    this.loading2 = true;
    this.failed2 = false;
    this.success2 = false;

    var id = parseInt(form.value["reservationId"]);
    var ret = this.userService.cancelCarReservation(id);
    ret.subscribe(data => {
        this.zone.run(() => {
          this.loadCarsReservations();
      });
        this.loading2 = false;
        this.success2 = true;
      },
      err => {
        this.loading2 = false;
        this.failed2 = true;
        this.errorCancelReservationVehicle = err.error;
        this.errorCancelReservationVehicleInfo = err.status + " " + err.statusText;
      });
  }

  rateAvioFlight(form: NgForm, id: number): void {

    form.value.ratingAvioCompany = parseInt(form.value.ratingAvioCompany);
    form.value.ratingFlight = parseInt(form.value.ratingFlight);

    var jsonized = JSON.stringify(form.value);
    var ret = this.userService.rateAvioFlight(jsonized, id);
    
    ret.subscribe(data => { 
      this.rateFlight(); 
    }, 
      err => { 
      });

  }

  rateCarVehicle(form: NgForm, id: number): void {

    console.log(form.value);
    console.log(id);

    form.value.ratingCarCompany = parseInt(form.value.ratingCarCompany);
    form.value.ratingVehicle = parseInt(form.value.ratingVehicle);

    var jsonized = JSON.stringify(form.value);
    var ret = this.userService.rateCarVehicle(jsonized, id);
    
    ret.subscribe(data => { this.rateVehicle(); }, err => { });
  }

  rateFlight() : void {
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

  rateVehicle() : void {
    var ret = this.userService.getRateableCars();
    
    ret.subscribe(data => {
        this.zone.run(() => 
        {
          this.vehicleRate = data.body["carsHistory"];
        });
      },
      err => {
      });
  }

}