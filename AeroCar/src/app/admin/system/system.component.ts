import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    console.log("DOING!")
    var ret = this.http.get("http://localhost:62541/api/system/check", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        if (data.status != 200) this.router.navigateByUrl("");
      },
      err => {
        console.log("ERROR");
        console.log(err);
        if (err.status == 401) this.router.navigateByUrl("");
      });
    console.log(ret);
  }

}
