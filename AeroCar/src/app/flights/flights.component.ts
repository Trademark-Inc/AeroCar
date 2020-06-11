import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  outboundFlights: any;
  informationProfile: any;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) { 
    var ret = this.http.get("http://localhost:62541/api/avio/company/get", {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => this.informationProfile = data.body["avioCompanyProfileDTOList"]);
      },
      err => {
        console.log("ERROR");
        console.log(err);
    });
  }

  ngOnInit(): void {
  }

  search(form: NgForm) {
    console.log(form.value);
    let param = new HttpParams();
    for(let key in form.value){
      if (key !== "arrival") 
        param = param.append(key, form.value[key]);
      else {
        if (form.value[key] !== "") {
          param = param.append(key, form.value[key]);
        }
      }
    }
    console.log(param);
    var ret = this.http.get("http://localhost:62541/api/flight/search", {
      params: param,
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => this.outboundFlights = data.body["outboundFlights"]);
      },
      err => {
        console.log("ERROR");
        console.log(err);
    });
  }

  reserve(id: number) {
    this.router.navigateByUrl("/flights/reservation/" + id);
  }
}
