import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class CarVehiclesComponent implements OnInit {

  vehicles: any;
  public loading: boolean;
  public success: boolean;
  public failed: boolean;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) { 
    var ret = this.http.get("http://localhost:62541/api/caradmin/company/get/vehicles", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => this.vehicles = data.body);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

  addVehicle(form: NgForm) {
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    this.loading = true;
    this.success = false;
    this.failed = false;
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/create/vehicle", jsonized, { 
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
    console.log(ret);
  }

  getVehicleTypeText(vehicleType: any): any {
    switch (vehicleType) {
      case 0: return "HatchBack";
      case 1: return "Sedan";
      case 2: return "Coupe";
      case 3: return "SUV";
    }

    return "Unknown";
  }

}
