import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AvioAdminService } from 'src/app/services/avioadmin.service';

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
  public errorCreateFlight: string;
  public errorCreateFlightInfo: string;

  constructor(private avioAdminService: AvioAdminService, private router: Router, private zone: NgZone) {
    this.loadCompanyData();
  }

  ngOnInit(): void {
  }

  loadCompanyData(): void {
    var ret = this.avioAdminService.getCompanyProfile();
    
    ret.subscribe(data => {
        this.zone.run(() => { 
          this.possibleLocations = data.body["avioCompany"].destinations;
          this.aeroplanes = data.body["avioCompany"].aeroplanes;
        });
      },
      err => {
      });
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
      form.value.departureLocation = this.transit[0];
      form.value.arrivalLocation = this.transit[this.transit.length - 1];
      var trans = this.transit.filter(item => item.name !== form.value.departureLocation.name && item.name !== form.value.arrivalLocation.name);
      form.value.transit = trans;

      var jsonized = JSON.stringify(form.value);
      var ret = this.avioAdminService.addFlight(jsonized);
      
      ret.subscribe(data => {
          this.loading = false;
          this.success = true;
        },
        err => {
          this.loading = false;
          this.failed = true;
          this.errorCreateFlight = err.error;
          this.errorCreateFlightInfo = err.status + " " + err.statusText;
        });
    } else {
        this.loading = false;
        this.failed = true;
        this.errorCreateFlight = "Not enough transit airports.";
        this.errorCreateFlightInfo = "400 Bad Request";
    }
  }

}
