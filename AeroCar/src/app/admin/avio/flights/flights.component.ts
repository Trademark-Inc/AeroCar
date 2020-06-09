import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class AvioFlightsComponent implements OnInit {

  @ViewChild('selectedLocation') selectedLocation;
  @ViewChild('removeTextBox') removeTextBox;
  
  transit: any = new Array<Object>();
  possibleLocations: any;
  aeroplanes: any;
  public loading: boolean;
  public success: boolean;
  public failed: boolean;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) {
    var ret = this.http.get("http://localhost:62541/api/avioadmin/company/get/profile", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => { 
          this.possibleLocations = data.body["avioCompany"].destinations;
          this.aeroplanes = data.body["avioCompany"].aeroplanes;
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

  addToTransit(): void {
    var pushable = this.possibleLocations.filter(item => item.name === this.selectedLocation.nativeElement.value)[0];

    if (pushable != null) {
      this.transit.push(pushable);
      this.possibleLocations = this.possibleLocations.filter(item => item.name !== this.selectedLocation.nativeElement.value);
    }
  }

  removeFromTransit(): void {
    var pushable = this.transit.filter(item => item.name === this.removeTextBox.nativeElement.value)[0];

    if (pushable != null) {
      this.possibleLocations.push(pushable);
      this.transit = this.transit.filter(item => item.name !== this.removeTextBox.nativeElement.value);
    }
  }

  addNewFlight(form: NgForm): void {
    this.loading = true;
    this.success = false;
    this.failed = false;
    if (this.transit.length >= 2) {  
      console.log(form);
      form.value.departureLocation = this.transit[0];
      form.value.arrivalLocation = this.transit[this.transit.length - 1];
      var trans = this.transit.filter(item => item.name !== form.value.departureLocation.name && item.name !== form.value.arrivalLocation.name);
      form.value.transit = trans;
      var jsonized = JSON.stringify(form.value);
      console.log(jsonized);
      var ret = this.http.post("http://localhost:62541/api/avioadmin/company/create/flight", jsonized, { 
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
    }else{
        this.loading = false;
        this.failed = true;
    }
  }

}
