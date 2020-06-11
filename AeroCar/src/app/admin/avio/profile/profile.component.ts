import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AvioAdminService } from 'src/app/services/avioadmin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class AvioProfileComponent implements OnInit {

  profile: any;
  public loading1: boolean;
  public success1: boolean;
  public failed1: boolean;
  public errorSaveProfile: string;
  public errorSaveProfileInfo: string;
  public loading2: boolean;
  public success2: boolean;
  public failed2: boolean;
  public errorRemoveFlight: string;
  public errorRemoveFlightInfo: string;
  public loading3: boolean;
  public success3: boolean;
  public failed3: boolean;
  public errorAddItem: string;
  public errorAddItemInfo: string;
  public loading4: boolean;
  public success4: boolean;
  public failed4: boolean;
  public errorAddTicket: string;
  public errorAddTicketInfo: string;
  public loading5: boolean;
  public success5: boolean;
  public failed5: boolean;
  public errorRemoveTicket: string;
  public errorRemoveTicketInfo: string;
  public loading6: boolean;
  public success6: boolean;
  public failed6: boolean;
  public errorRemoveItem: string;
  public errorRemoveItemInfo: string;

  constructor(private avioAdminService: AvioAdminService, private router: Router, private zone: NgZone) {
    this.loadProfile();
  }

  ngOnInit(): void {
  }

  loadProfile(): void{
    var ret = this.avioAdminService.getCompanyProfile();
    
    ret.subscribe(data => {
        this.zone.run(() => this.profile = data.body);
      },
      err => {
      });
  }

  updateCompanyProfile(form: NgForm): void {
    var jsonized = JSON.stringify(form.value);
    
    this.loading1 = true;
    this.success1 = false;
    this.failed1 = false;
    
    var ret = this.avioAdminService.updateCompanyProfile(jsonized);

    ret.subscribe(data => {
        this.loading1 = false;
        this.success1 = true;
      },
      err => {
        this.loading1 = false;
        this.failed1 = true;
        this.errorSaveProfile = err.error;
        this.errorSaveProfileInfo = err.status + " " + err.statusText;
      });
  }

  removeFlight(form: NgForm): void {
    this.loading2 = true;
    this.success2 = false;
    this.failed2 = false;

    var ret = this.avioAdminService.removeFlight(form.value.id);
    
    ret.subscribe(data => {
        this.loading2 = false;
        this.success2 = true;
        this.loadProfile();
      },
      err => {
        this.loading2 = false;
        this.failed2 = true;
        this.errorRemoveFlight = err.error;
        this.errorRemoveFlightInfo = err.status + " " + err.statusText;
      });
  }

  getAeroplane(id: number): any {
    return this.profile.avioCompany.aeroplanes.filter(item => item.aeroplaneId == id)[0];
  }

  addBonusTicket(form: NgForm): void {
    var jsonized = JSON.stringify(form.value);

    this.loading4 = true;
    this.success4 = false;
    this.failed4 = false;

    var ret = this.avioAdminService.addBonusTicket(jsonized);
    
    ret.subscribe(data => {
        this.loading4 = false;
        this.success4 = true;
        this.loadProfile();
      },
      err => {
        this.loading4 = false;
        this.failed4 = true;
        this.errorAddTicket = err.error;
        this.errorAddTicketInfo = err.status + " " + err.statusText;
      });
  }

  removeTicket(form: NgForm): void {
    this.loading5 = true;
    this.success5 = false;
    this.failed5 = false;

    var ret = this.avioAdminService.removeBonusTicket(form.value.id);
    
    ret.subscribe(data => {
        this.loading5 = false;
        this.success5 = true;
        this.loadProfile();
      },
      err => {
        this.loading5 = false;
        this.failed5 = true;
        this.errorRemoveTicket = err.error;
        this.errorRemoveTicketInfo = err.status + " " + err.statusText;
      });
  }

  addItem(form: NgForm): void {
    var jsonized = JSON.stringify(form.value);
    
    this.loading3 = true;
    this.success3 = false;
    this.failed3 = false;
    
    var ret = this.avioAdminService.addPriceListItem(jsonized);
    
    ret.subscribe(data => {
        this.loading3 = false;
        this.success3 = true;
        this.loadProfile();
      },
      err => {
        this.loading3 = false;
        this.failed3 = true;
        this.errorAddItem = err.error;
        this.errorAddItemInfo = err.status + " " + err.statusText;
      });
  }

  removeItem(form: NgForm): void {
    this.loading6 = true;
    this.success6 = false;
    this.failed6 = false;
    
    var ret = this.avioAdminService.removePriceListItem(form.value.id);

    ret.subscribe(data => {
        this.loading6 = false;
        this.success6 = true;
        this.loadProfile();
      },
      err => {
        this.loading6 = false;
        this.failed6 = true;
        this.errorRemoveItem = err.error;
        this.errorRemoveItemInfo = err.status + " " + err.statusText;
      });
  }

}
