import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class FlightSeatsComponent implements OnInit {

  reservationId: any;
  reservation: any;
  seats: any;
  takenSeats: any;
  id: any;
  flight: any;
  company: any;
  deletedSeats: number[];
  seatCount: number[];
  rowCount: number[];

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private zone: NgZone) {
    this.reservationId = this.route.snapshot.paramMap.get('reservationId');
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadReservationData();
  }

  ngOnInit(): void {
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
      });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });

    var ret = this.http.get("http://localhost:62541/api/flight/" + this.id + "/aeroplane", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(this.id);
        this.zone.run(() => {
          this.seats = data.body["aeroplane"].seats;
          console.log((this.seats.seatCount / this.seats.inOneRow).toFixed(0));
          // this.seats = data.body["avioCompany"].aeroplanes.filter(item => item.aeroplaneId === this.id).seats;
          this.seatCount = Array.from(Array(this.seats.seatCount / this.seats.inOneRow).keys());
          this.rowCount = Array.from(Array(this.seats.inOneRow).keys());
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  loadReservationData(): void {
    var ret = this.http.get("http://localhost:62541/api/reservation/flight/" + this.reservationId, {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
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
        this.router.navigateByUrl("/flights");
      });

      var ret = this.http.get("http://localhost:62541/api/reservation/flight/" + this.id + "/seats/taken", {
        headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")},
        observe: 'response',
        withCredentials: true,
        responseType: 'json' }).subscribe(data => {
          console.log("DATA");
          console.log(data);
          console.log(data.body);
          this.zone.run(() => {
            this.takenSeats = data.body["takenSeats"];
        });
        },
        err => {
          console.log("ERROR");
          console.log(err);
          this.router.navigateByUrl("/flights");
        });
  }

  isSeatAvailable(seat: number): boolean {
    for (let deleted of this.seats.deletedSeats) {
      if (deleted.seatNumber == seat) {
        return false;
      }
    }

    for (let takenSeat of this.takenSeats) {
      if (seat == takenSeat) {
        return false;
      }
    }

    return true;
  }

  next(seat: number): void {
    console.log(seat);

    var data = {
      "reservationId": parseInt(this.reservationId),
      "seat": seat
    };

    var jsonized = JSON.stringify(data);
    console.log(jsonized);
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/step/2", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.router.navigateByUrl("/flights/reservation/" + this.flight.flightId + "/" + this.reservationId + "/details");
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  cancel(): void {
    var ret = this.http.get("http://localhost:62541/api/reservation/flight/remove/" + this.reservationId, {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.router.navigateByUrl("/flights");
      });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

}
