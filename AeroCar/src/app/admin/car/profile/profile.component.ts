import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CarAdminService } from 'src/app/services/caradmin.service';

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
  public errorUpdateProfile: string;
  public errorUpdateProfileInfo: string;

  constructor(private carAdminService: CarAdminService, private router: Router, private zone: NgZone) {
    this.loadCompanyProfile();
  }

  ngOnInit(): void {
  }

  loadCompanyProfile(): void {
    var ret = this.carAdminService.getCompanyProfile();
    
    ret.subscribe(data => {
        this.zone.run(() => this.profile = data.body);
      },
      err => {
      });
  }

  updateCompanyProfile(form: NgForm): void {
    this.loading = true;
    this.success = false;
    this.failed = false;

    var jsonized = JSON.stringify(form.value);
    var ret = this.carAdminService.updateCompanyProfile(jsonized);

    ret.subscribe(data => {
        this.loading = false;
        this.success = true;
      },
      err => {
        this.loading = false;
        this.failed = true;
        this.errorUpdateProfile = err.error;
        this.errorUpdateProfileInfo = err.status + " " + err.statusText;
      });
  }

}
