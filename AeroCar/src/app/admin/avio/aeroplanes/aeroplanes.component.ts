import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AvioAdminService } from 'src/app/services/avioadmin.service';

@Component({
  selector: 'app-aeroplanes',
  templateUrl: './aeroplanes.component.html',
  styleUrls: ['./aeroplanes.component.css']
})
export class AvioAeroplanesComponent implements OnInit {

  aeroplanes: any;

  constructor(private avioAdminService: AvioAdminService, private router: Router, private zone: NgZone) {
    this.loadCompanyData();
  }

  ngOnInit(): void {
  }

  loadCompanyData(): void {
    var ret = this.avioAdminService.getCompanyProfile();

    ret.subscribe(data => {
      this.zone.run(() => { 
        this.aeroplanes = data.body["avioCompany"].aeroplanes;
      });
    },
    err => {
    });
  }

}
