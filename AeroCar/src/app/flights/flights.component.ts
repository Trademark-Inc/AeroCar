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

  availableFlights: any;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) { }

  ngOnInit(): void {
  }

  search(form: NgForm) {
    let param = new HttpParams();
    for(let key in form.value){
      param.append(key, form.value[key]);
    }
    var ret = this.http.get("http://localhost:62541/api/flight/search", {
      params: param,
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => this.availableFlights = data.body);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

}
