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
  public loading1: boolean;
  public success1: boolean;
  public failed1: boolean;
  public loading2: boolean;
  public success2: boolean;
  public failed2: boolean;

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
    this.loading1 = true;
    this.success1 = false;
    this.failed1 = false;
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/create/vehicle", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
        this.loading1 = false;
        this.success1 = true;
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading1 = false;
        this.failed1 = true;
      });
    console.log(ret);
  }

  removeVehicle(form: NgForm): void {
    this.loading2 = true;
    this.success2 = false;
    this.failed2 = false;
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/remove/vehicle/" + form.value.id, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
        this.loading2 = false;
        this.success2 = true;
        this.refresh();
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading2 = false;
        this.failed2 = true;
      });
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

  refresh(): void {
    window.location.reload();
  }

}
