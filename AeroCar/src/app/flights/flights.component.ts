import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { AvioService } from '../services/avio.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  outboundFlights: any;
  outboundListFilled: boolean;
  returnFlights: any;
  returnListFilled: boolean;
  informationProfile: any;
  searching: boolean;
  searchError: boolean;
  errorSearch: string;
  errorSearchInfo: string;

  constructor(private avioService: AvioService, private router: Router, private zone: NgZone) { 
    this.outboundListFilled = false;
    this.returnListFilled = false;
    this.loadCompanies();
  }

  ngOnInit(): void {
  }

  loadCompanies(): void {
    var ret = this.avioService.getCompanies();

    ret.subscribe(data => {
      this.zone.run(() => this.informationProfile = data.body["avioCompanyProfileDTOList"]);
      },
      err => {
    });
  }

  search(form: NgForm) {
    this.searching = true;
    let param = new HttpParams();

    var returns = false;
    for(let key in form.value){
      if (key == "ticket") {
        if (form.value[key] == 2) {
          returns = true;
        }
      }

      if (key !== "arrival") 
        param = param.append(key, form.value[key]);
      else {
        if (form.value[key] !== "") {
          param = param.append(key, form.value[key]);
        }
      }
    }
    
    var ret = this.avioService.searchFlights(param);
    
    this.outboundListFilled = false;
    this.returnListFilled = false;
    this.searchError = false;
    ret.subscribe(data => {
        this.zone.run(() => {
          this.searching = false;
          this.outboundFlights = data.body["outboundFlights"];
          
          if (this.outboundFlights != null && this.outboundFlights.length > 0) this.outboundListFilled = true;

          if (returns) {
            this.returnFlights = data.body["returnFlights"];
            
            if (this.returnFlights != null && this.returnFlights.length > 0) { 
              localStorage.setItem("returnFlights", JSON.stringify(this.returnFlights));
              this.returnListFilled = true;
            }
          }
        });
      },
      err => {
        this.searching = false;
        this.searchError = true;
        this.errorSearch = err.error;
        this.errorSearchInfo = err.status + " " + err.statusText;
    });
  }

  reserve(id: number) {
    this.router.navigateByUrl("/flights/reservation/" + id);
  }
}
