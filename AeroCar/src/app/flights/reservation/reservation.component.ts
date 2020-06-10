import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private zone: NgZone) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadReservationData();
  }

  ngOnInit(): void {
  }

  loadReservationData(): void {
    var ret = this.http.get("http://localhost:62541/api/flight/" + this.id, {
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.flight = data.body["flight"];
          this.company = data.body["company"];
          this.companyProfile = data.body["companyProfile"];
      });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  next(form: NgForm): void {

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

    console.log(form.value);
    console.log(json);
    var jsonized = JSON.stringify(json);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/step/1", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(form.value);
        this.router.navigateByUrl("/flights/reservation/" + this.flight.flightId + "/" + data.body["reservation"].flightReservationId + "/seats");
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  cancel(): void {
    this.router.navigateByUrl("/flights");
  }

}
