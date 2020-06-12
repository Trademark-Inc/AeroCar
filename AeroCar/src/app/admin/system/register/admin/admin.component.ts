import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class SystemAdminComponent implements OnInit {
  
  items: any;
  avioCompanies: any;
  carCompanies: any;
  public loading1: boolean;
  public success1: boolean;
  public failed1: boolean;
  public errorAddAvio: string;
  public errorAddAvioInfo: string;
  public loading2: boolean;
  public success2: boolean;
  public failed2: boolean;
  public errorRemoveAvio: string;
  public errorRemoveAvioInfo: string;
  public loading3: boolean;
  public success3: boolean;
  public failed3: boolean;
  public errorAddCar: string;
  public errorAddCarInfo: string;
  public loading4: boolean;
  public success4: boolean;
  public failed4: boolean;
  public errorRemoveCar: string;
  public errorRemoveCarInfo: string;

  constructor(private systemService: SystemService, private router: Router, private zone: NgZone) {
    this.loadAdmins();
    this.loadAvioCompanies();
    this.loadCarCompanies();
  }

  loadAdmins(): void {
    var ret = this.systemService.getAdmins();

    ret.subscribe(data => {
      this.zone.run(() => this.items = data.body);
    },
    err => {
    });
  }

  loadAvioCompanies(): void {
    var ret = this.systemService.getAvioCompanies();

    ret.subscribe(data => {
      this.zone.run(() => this.avioCompanies = data.body);
    },
    err => {
    });
  }

  loadCarCompanies(): void {
    var ret = this.systemService.getCarCompanies();

    ret.subscribe(data => {
      this.zone.run(() => this.carCompanies = data.body);
    },
    err => {
    });
  }

  ngOnInit(): void {
  }

  addAvioAdmin(form: NgForm): void {
    this.loading1 = true;
    this.success1 = false;
    this.failed1 = false;
    
    var jsonized = JSON.stringify(form.value);
    var ret = this.systemService.addAvioAdmin(jsonized);

    ret.subscribe(data => {
      this.loading1 = false;
      this.success1 = true;
      this.loadAdmins();
    },
    err => {
      this.loading1 = false;
      this.failed1 = true;
      this.errorAddAvio = err.error;
      this.errorAddAvioInfo = err.status + " " + err.statusText;
    });
  }

  removeAvioAdmin(form: NgForm): void {
    this.loading2 = true;
    this.success2 = false;
    this.failed2 = false;

    var jsonized = JSON.stringify(form.value);
    var ret = this.systemService.removeAvioAdmin(form.value.id);

    ret.subscribe(data => {
      this.loading2 = false;
      this.success2 = true;
      this.loadAdmins();
    },
    err => {
      this.loading2 = false;
      this.failed2 = true;
      this.errorRemoveAvio = err.error;
      this.errorRemoveAvioInfo = err.status + " " + err.statusText;
    });
  }

  addCarAdmin(form: NgForm): void {
    this.loading3 = true;
    this.success3 = false;
    this.failed3 = false;
    
    var jsonized = JSON.stringify(form.value);
    var ret = this.systemService.addCarAdmin(jsonized);
    
    ret.subscribe(data => {
        this.loading3 = false;
        this.success3 = true;
        this.loadAdmins();
      },
      err => {
        this.loading3 = false;
        this.failed3 = true;
        this.errorAddCar = err.error;
        this.errorAddCarInfo = err.status + " " + err.statusText;
      });
  }

  removeCarAdmin(form: NgForm): void {
    this.loading4 = true;
    this.success4 = false;
    this.failed4 = false;
    
    var jsonized = JSON.stringify(form.value);
    var ret = this.systemService.removeCarAdmin(form.value.id);
    
    ret.subscribe(data => {
        this.loading4 = false;
        this.success4 = true;
        this.loadAdmins();
      },
      err => {
        this.loading4 = false;
        this.failed4 = true;
        this.errorRemoveCar = err.error;
        this.errorRemoveCarInfo = err.status + " " + err.statusText;
      });
  }

}
