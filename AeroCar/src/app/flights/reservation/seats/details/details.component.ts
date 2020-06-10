import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  @ViewChild('confirm') private confirmModal: ElementRef;

  reservationId: any;
  reservation: any;
  id: any;

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private zone: NgZone) {
    this.reservationId = this.route.snapshot.paramMap.get('reservationId');
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadReservationData();
  }

  ngOnInit(): void {
  }

  loadReservationData(): void {
    var ret = this.http.get("http://localhost:62541/api/reservation/flight/" + this.reservationId, {
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.reservation = data.body["reservation"];
      });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  confirm(form: NgForm) {

    var data = {
      "reservationId": parseInt(this.reservationId),
      "name": form.value["name"],
      "surname": form.value["surname"],
      "passport": form.value["passport"],
    };

    console.log(form.value);
    var jsonized = JSON.stringify(data);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/step/3", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        // this.confirmModal.nativeElement.click();
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

}
