import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AvioService } from 'src/app/services/avio.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class FlightReservationComponent implements OnInit {

  id: any;
  flight: any;
  company: any;
  companyProfile: any;

  loading: boolean;
  failed: boolean;
  errorNext: string;
  errorNextInfo: string;

  constructor(private route: ActivatedRoute, private avioService: AvioService, private reservationService: ReservationService, private router: Router, private zone: NgZone) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadReservationData();
  }

  ngOnInit(): void {
  }

  loadReservationData(): void {
    var ret = this.avioService.getFlight(this.id);
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.flight = data.body["flight"];
          this.company = data.body["company"];
          this.companyProfile = data.body["companyProfile"];
      });
      },
      err => {
      });
  }

  next(form: NgForm): void {

    this.loading = true;
    this.failed = false;

    var items = [];
    this.company.priceList.forEach(element => {
      items.push({
        "id": element.priceListIdemId,
        "selected": (form.value[element.priceListIdemId] == "") ? false : true
      });
    });

    var json = {
      "flight": this.flight,
      "selectedPriceListItems": items
    }

    var jsonized = JSON.stringify(json);
    var ret = this.reservationService.reserveFlightStepOne(jsonized);
    ret.subscribe(data => {
        this.loading = false;
        this.router.navigateByUrl("/flights/reservation/" + this.flight.flightId + "/" + data.body["reservation"].flightReservationId + "/seats");
      },
      err => {
        this.loading = false;
        this.failed = true;
        this.errorNext = err.error;
        this.errorNextInfo = err.status + " " + err.statusText;
      });
  }

  cancel(): void {
    this.router.navigateByUrl("/flights");
  }

}
