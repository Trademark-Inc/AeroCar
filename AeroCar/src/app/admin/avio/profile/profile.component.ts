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
  public loading5: boolean;
  public success5: boolean;
  public failed5: boolean;
  public loading6: boolean;
  public success6: boolean;
  public failed6: boolean;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) {
    this.loadProfile();
  }

  ngOnInit(): void {
  }

  loadProfile(): void{
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

  updateCompanyProfile(form: NgForm): void {
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    this.loading1 = true;
    this.success1 = false;
    this.failed1 = false;
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/update/profile", jsonized, { 
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
  }

  removeFlight(form: NgForm): void {
    this.loading2 = true;
    this.success2 = false;
    this.failed2 = false;
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/remove/flight/" + form.value.id, null, { 
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
        this.loadProfile();
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading2 = false;
        this.failed2 = true;
      });
  }

  getAeroplane(id: number): any {
    return this.profile.avioCompany.aeroplanes.filter(item => item.aeroplaneId == id)[0];
  }

  addBonusTicket(form: NgForm): void {
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    this.loading4 = true;
    this.success4 = false;
    this.failed4 = false;
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/create/ticket", jsonized, { 
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
        this.loadProfile();
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading4 = false;
        this.failed4 = true;
      });
  }

  removeTicket(form: NgForm): void {
    this.loading5 = true;
    this.success5 = false;
    this.failed5 = false;
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/remove/ticket/" + form.value.id, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
        this.loading5 = false;
        this.success5 = true;
        this.refresh();
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading5 = false;
        this.failed5 = true;
      });
  }

  addItem(form: NgForm): void {
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    this.loading3 = true;
    this.success3 = false;
    this.failed3 = false;
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/create/item", jsonized, { 
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
        this.loadProfile();
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading3 = false;
        this.failed3 = true;
      });
  }

  removeItem(form: NgForm): void {
    this.loading6 = true;
    this.success6 = false;
    this.failed6 = false;
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/remove/ticket/" + form.value.id, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
        this.loading6 = false;
        this.success6 = true;
        this.refresh();
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading6 = false;
        this.failed6 = true;
      });
  }

  refresh(): void {
    window.location.reload();
  }

}
