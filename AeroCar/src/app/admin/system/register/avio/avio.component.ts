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
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
    console.log(ret);
  }

  removeCompany(form: NgForm): void {
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
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
    console.log(ret);
  }

}
