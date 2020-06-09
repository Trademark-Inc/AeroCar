import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class CarOfficesComponent implements OnInit {

  offices: any;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) { 
    var ret = this.http.get("http://localhost:62541/api/caradmin/company/get/offices", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => this.offices = data.body);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

  addOffice(form: NgForm) {
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/create/office", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
        this.refresh();
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
    console.log(ret);
  }

  removeOffice(form: NgForm): void {
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/remove/office/" + form.value.id, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
        this.refresh();
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  refresh(): void {
    window.location.reload();
  }

}
