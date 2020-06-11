import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  listContainsItems: boolean;
  filtersShown: boolean;

  btnFiltersText: string;

  informationProfile: any;

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

  searchForFlights(): void {
    this.listContainsItems = true;
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
