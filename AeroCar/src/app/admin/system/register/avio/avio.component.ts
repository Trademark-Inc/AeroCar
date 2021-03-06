import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-avio',
  templateUrl: './avio.component.html',
  styleUrls: ['./avio.component.css']
})
export class SystemAvioComponent implements OnInit {

  items: any;
  public loading1: boolean;
  public success1: boolean;
  public failed1: boolean;
  public errorAdd: string;
  public errorAddInfo: string;
  public loading2: boolean;
  public success2: boolean;
  public failed2: boolean;
  public errorRemove: string;
  public errorRemoveInfo: string;

  constructor(private systemService: SystemService, private router: Router, private zone: NgZone) {
    this.getCompanies();
  }

  ngOnInit(): void {
  }

  getCompanies(): void {
    var ret = this.systemService.getAvioCompanies();

    ret.subscribe(data => {
      this.zone.run(() => this.items = data.body);
    },
    err => { 

    });
  }

  addCompany(form: NgForm): void {
    this.loading1 = true;
    this.success1 = false;
    this.failed1 = false;
    
    var jsonized = JSON.stringify(form.value);
    
    var ret = this.systemService.addAvioCompany(jsonized);
    ret.subscribe(data => {
      this.loading1 = false;
      this.success1 = true;
      this.getCompanies();
    },
    err => {
      this.loading1 = false;
      this.failed1 = true;
      this.errorAdd = err.error;
      this.errorAddInfo = err.status + " " + err.statusText;
    });
  }

  removeCompany(form: NgForm): void {
    this.loading2 = true;
    this.success2 = false;
    this.failed2 = false;

    var ret = this.systemService.removeAvioCompany(form.value.id);
    ret.subscribe(data => {
      this.loading2 = false;
      this.success2 = true;
      this.getCompanies();
    },
    err => {
      this.loading2 = false;
      this.failed2 = true;
      this.errorRemove = err.error;
      this.errorRemoveInfo = err.status + " " + err.statusText;
    });
  }

}
