import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class AvioProfileComponent implements OnInit {

  profile: any;

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
        this.zone.run(() => this.profile = data.body);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

  updateCompanyProfile(form: NgForm): void {
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/update/profile", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  removeFlight(form: NgForm): void {
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/remove/flight/" + form.value.id, null, { 
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

  getAeroplane(id: number): any {
    return this.profile.avioCompany.aeroplanes.filter(item => item.aeroplaneId == id)[0];
  }

  addBonusTicket(form: NgForm): void {
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/create/ticket", jsonized, { 
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

  removeTicket(form: NgForm): void {
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/remove/ticket/" + form.value.id, null, { 
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

  addItem(form: NgForm): void {
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/create/item", jsonized, { 
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

  removeItem(form: NgForm): void {
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/remove/ticket/" + form.value.id, null, { 
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
