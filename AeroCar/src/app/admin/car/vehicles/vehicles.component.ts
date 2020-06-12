import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CarAdminService } from 'src/app/services/caradmin.service';

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
  public errorAddCar: string;
  public errorAddCarInfo: string;
  public loading2: boolean;
  public success2: boolean;
  public failed2: boolean;
  public errorRemoveCar: string;
  public errorRemoveCarInfo: string;

  constructor(private carAdminService: CarAdminService, private router: Router, private zone: NgZone) { 
    this.loadCompanyVehicles();
  }

  ngOnInit(): void {
  }

  loadCompanyVehicles() {
    var ret = this.carAdminService.getVehicles();
    
    ret.subscribe(data => {
        this.zone.run(() => this.vehicles = data.body);
      },
      err => {
      });
  }

  addVehicle(form: NgForm) {

    form.value.carType = parseInt(form.value.carType);

    var jsonized = JSON.stringify(form.value);

    this.loading1 = true;
    this.success1 = false;
    this.failed1 = false;

    var ret = this.carAdminService.addVehicle(jsonized);
    ret.subscribe(data => {
        this.loading1 = false;
        this.success1 = true;
        this.loadCompanyVehicles();
      },
      err => {
        console.log(err);
        this.loading1 = false;
        this.failed1 = true;
        this.errorAddCar = err.error;
        this.errorAddCarInfo = err.status + " " + err.statusText;
      });
  }

  removeVehicle(form: NgForm): void {
    this.loading2 = true;
    this.success2 = false;
    this.failed2 = false;
    
    var ret = this.carAdminService.removeVehicle(form.value.id);
    ret.subscribe(data => {
        this.loading2 = false;
        this.success2 = true;
        this.loadCompanyVehicles();
      },
      err => {
        this.loading2 = false;
        this.failed2 = true;
        this.errorRemoveCar = err.error;
        this.errorRemoveCarInfo = err.status + " " + err.statusText;
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
  
}
