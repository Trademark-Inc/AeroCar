import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CarAdminService } from 'src/app/services/caradmin.service';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class CarOfficesComponent implements OnInit {

  public loaded: boolean;
  offices: any;
  public loading1: boolean;
  public success1: boolean;
  public failed1: boolean;
  public errorAddOffice: string;
  public errorAddOfficeInfo: string;
  public loading2: boolean;
  public success2: boolean;
  public failed2: boolean;
  public errorRemoveOffice: string;
  public errorRemoveOfficeInfo: string;

  constructor(private carAdminService: CarAdminService, private router: Router, private zone: NgZone) { 
    this.loadCompanyOffices();
  }

  ngOnInit(): void {
  }

  loadCompanyOffices(): void {
    this.loaded = false;
    var ret = this.carAdminService.getOffices();
    
    ret.subscribe(data => {
        this.zone.run(() => this.offices = data.body);
        this.loaded = true;
      },
      err => {
      });
  }

  addOffice(form: NgForm) {
    var jsonized = JSON.stringify(form.value);

    this.loading1 = true;
    this.success1 = false;
    this.failed1 = false;
    
    var ret = this.carAdminService.addOffice(jsonized);
    ret.subscribe(data => {
      this.loadCompanyOffices();
      this.success1 = true;
      this.loading1 = false;
      },
      err => {
        this.loading1 = false;
        this.failed1 = true;
        this.errorAddOffice = err.error;
        this.errorAddOfficeInfo = err.status + " " + err.statusText;
      });
  }

  removeOffice(form: NgForm): void {
    var ret = this.carAdminService.removeOffice(form.value.id);
    
    this.loading2 = true;
    this.success2 = false;
    this.failed2 = false;

    ret.subscribe(data => {
        this.loadCompanyOffices();
        this.success2 = true;
        this.loading2 = false;
        },
        err => {
          this.loading2 = false;
          this.failed2 = true;
          this.errorRemoveOffice = err.error;
          this.errorRemoveOfficeInfo = err.status + " " + err.statusText;
      });
  }
  
}
