import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class FlightsProfileComponent implements OnInit {

  id: any;
  profileDetails: any;

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private zone: NgZone) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadProfileData();
   }

  ngOnInit(): void {
  }

  loadProfileData(): void {
    var ret = this.http.get("http://localhost:62541/api/avio/company/details/get/" + this.id, {
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => { 
          this.profileDetails = data.body["avioCompanyProfileDTO"]
      });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

}
