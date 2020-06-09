import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class CarProfileComponent implements OnInit {

  profile: any;
  public loading: boolean;
  public success: boolean;
  public failed: boolean;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) {
    var ret = this.http.get("http://localhost:62541/api/caradmin/company/get/profile", { 
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
    this.loading = true;
    this.success = false;
    this.failed = false;
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/update/profile", jsonized, { 
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
  }

}
