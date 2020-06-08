import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aeroplanes',
  templateUrl: './aeroplanes.component.html',
  styleUrls: ['./aeroplanes.component.css']
})
export class AvioAeroplanesComponent implements OnInit {

  aeroplanes: any;

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
        this.zone.run(() => { 
          this.aeroplanes = data.body["avioCompany"].aeroplanes;
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

}
