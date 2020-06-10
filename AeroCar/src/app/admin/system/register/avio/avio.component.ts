import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avio',
  templateUrl: './avio.component.html',
  styleUrls: ['./avio.component.css']
})
export class SystemAvioComponent implements OnInit {

  items: any;
  public loading1: boolean;
  public success1: boolean;
  public failed1: boolean;
  public loading2: boolean;
  public success2: boolean;
  public failed2: boolean;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) {
    var ret = this.http.get("http://localhost:62541/api/system/avio/get/all", { 
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
   }

  ngOnInit(): void {
  }

  addCompany(form: NgForm): void {
    this.loading1 = true;
    this.success1 = false;
    this.failed1 = false;
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/system/avio/create", jsonized, { 
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

  removeCompany(form: NgForm): void {
    this.loading2 = true;
    this.success2 = false;
    this.failed2 = false;
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/system/avio/remove/" + form.value.id, jsonized, { 
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

}
