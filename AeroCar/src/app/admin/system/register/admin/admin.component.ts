import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class SystemAdminComponent implements OnInit {
  
  items: any;
  avioCompanies: any;
  carCompanies: any;
  public loading1: boolean;
  public success1: boolean;
  public failed1: boolean;
  public loading2: boolean;
  public success2: boolean;
  public failed2: boolean;
  public loading3: boolean;
  public success3: boolean;
  public failed3: boolean;
  public loading4: boolean;
  public success4: boolean;
  public failed4: boolean;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) {
    var ret = this.http.get("http://localhost:62541/api/system/admin/get/all", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => this.items = data.body);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });

      this.http.get("http://localhost:62541/api/system/avio/get/all", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => this.avioCompanies = data.body);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });

      this.http.get("http://localhost:62541/api/system/car/get/all", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => this.carCompanies = data.body);
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
   }

  ngOnInit(): void {
  }

  addAvioAdmin(form: NgForm): void {
    this.loading1 = true;
    this.success1 = false;
    this.failed1 = false;
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/system/admin/avio/create", jsonized, { 
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

  removeAvioAdmin(form: NgForm): void {
    this.loading2 = true;
    this.success2 = false;
    this.failed2 = false;
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/system/admin/avio/remove/" + form.value.id, jsonized, { 
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
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading2 = false;
        this.failed2 = true;
      });
    console.log(ret);
  }

  addCarAdmin(form: NgForm): void {
    this.loading3 = true;
    this.success3 = false;
    this.failed3 = false;
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/system/admin/car/create", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
        this.loading3 = false;
        this.success3 = true;
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading3 = false;
        this.failed3 = true;
      });
    console.log(ret);
  }

  removeCarAdmin(form: NgForm): void {
    this.loading4 = true;
    this.success4 = false;
    this.failed4 = false;
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/system/admin/car/remove/" + form.value.id, jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
        this.loading4 = false;
        this.success4 = true;
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading4 = false;
        this.failed4 = true;
      });
    console.log(ret);
  }

}
