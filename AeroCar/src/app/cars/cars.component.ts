import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  
  @ViewChild('confirmReservationModal') private confirmModal: ElementRef;

  listContainsItems: boolean;
  filtersShown: boolean;

  btnFiltersText: string;

  informationProfile: any;
  availableCars: any;

  reservationDetails: any;
  selectedReservationVehicleId: any;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) {
    this.listContainsItems = false;
    this.filtersShown = false;
    this.btnFiltersText = "+ Filters";

    var ret = this.http.get("http://localhost:62541/api/car/company/get", {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => this.informationProfile = data.body["carCompanyProfileDTOList"]);
      },
      err => {
        console.log("ERROR");
        console.log(err);
    });

  }

  ngOnInit(): void {
  }

  searchForCars(form: NgForm): void {
    this.reservationDetails = form.value;
    console.log(form.value);
    let param = new HttpParams();
    for(let key in form.value){
      param = param.append(key, form.value[key]);
    }
    console.log(param);
    var ret = this.http.get("http://localhost:62541/api/car/search", {
      params: param,
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.availableCars = data.body;
          if (this.availableCars.length > 0) 
            this.listContainsItems = true;
          else
            this.listContainsItems = false;
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  showConfirmDialog(vehicleId: number): void {

    if (localStorage.getItem("token") == null) {
      document.getElementById("openErrorButton").click();
      return;
    }

    console.log("CONFIRM");
    this.selectedReservationVehicleId = vehicleId;
    document.getElementById("openModalButton").click();
  }

  confirm(): void {

    var data = {
      "reservationDetails": this.reservationDetails,
      "vehicleId": this.selectedReservationVehicleId
    }

    var jsonized = JSON.stringify(data);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/reservation/car", jsonized, { 
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

  getVehicleTypeText(vehicleType: any): any {
    switch (vehicleType) {
      case 1: return "HatchBack";
      case 2: return "Sedan";
      case 3: return "Coupe";
      case 4: return "SUV";
    }

    return "Unknown";
  }

  toggleFilters(): void {
    this.filtersShown = !this.filtersShown;
    
    if (this.filtersShown) {
      this.btnFiltersText = "- Filters";
    } else {
      this.btnFiltersText = "+ Filters";
    }
  }

}
