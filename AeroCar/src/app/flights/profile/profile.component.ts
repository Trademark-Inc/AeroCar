import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AvioService } from 'src/app/services/avio.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class FlightsProfileComponent implements OnInit {

  id: any;
  profileDetails: any;

  constructor(private route: ActivatedRoute, private avioService: AvioService, private router: Router, private zone: NgZone) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadProfileData();
   }

  ngOnInit(): void {
  }

  loadProfileData(): void {
    var ret = this.avioService.getCompany(this.id);
    
    ret.subscribe(data => {
        this.zone.run(() => { 
          this.profileDetails = data.body["avioCompanyProfileDTO"]
      });
      },
      err => {
      });
  }

}
