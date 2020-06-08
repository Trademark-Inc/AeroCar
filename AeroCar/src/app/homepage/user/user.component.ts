import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  profile: any;

  constructor(public http: HttpClient, private router: Router, public zone: NgZone) {
    var ret = this.http.get("http://localhost:62541/api/user/current", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => 
        {
          this.profile = data.body["user"];
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.router.navigateByUrl("");
      });
  }

  ngOnInit(): void {
  }

}
