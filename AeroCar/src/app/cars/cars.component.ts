import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  
  @ViewChild('confirmReservationModal') private confirmModal: ElementRef;

  listContainsItems: boolean;
  searching: boolean;
  filtersShown: boolean;

  btnFiltersText: string;

  informationProfile: any;
  availableCars: any;

  reservationDetails: any;
  selectedReservationVehicleId: any;

  constructor(private carService: CarService, private reservationService: ReservationService, private router: Router, private zone: NgZone) {
    this.listContainsItems = false;
    this.filtersShown = false;
    this.btnFiltersText = "+ Filters";
    this.loadCompanies();
  }

  ngOnInit(): void {
  }

  loadCompanies(): void {
    var ret = this.carService.getCompanies();
    
    ret.subscribe(data => {
        this.zone.run(() => this.informationProfile = data.body["carCompanyProfileDTOList"]);
      },
      err => {
    });
  }

  searchForCars(form: NgForm): void {
    this.searching = true;
    this.reservationDetails = form.value;
    
    let param = new HttpParams();
    for(let key in form.value){
      param = param.append(key, form.value[key]);
    }
    
    var ret = this.carService.searchCars(param);
  
    ret.subscribe(data => {
        this.zone.run(() => {
          this.searching = false;
          this.availableCars = data.body;
          if (this.availableCars.length > 0) 
            this.listContainsItems = true;
          else
            this.listContainsItems = false;
        });
      },
      err => {
        this.searching = false;
      });
  }

  showConfirmDialog(vehicleId: number): void {
    if (localStorage.getItem("token") == null) {
      document.getElementById("openErrorButton").click();
      return;
    }

    this.selectedReservationVehicleId = vehicleId;
    document.getElementById("openModalButton").click();
  }

  confirm(): void {
    var data = {
      "reservationDetails": this.reservationDetails,
      "vehicleId": this.selectedReservationVehicleId
    }

    var jsonized = JSON.stringify(data);
    var ret = this.reservationService.reserveCar(jsonized);
    
    ret.subscribe(data => {
      this.availableCars = [];
      this.listContainsItems = false;
      },
      err => {
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
