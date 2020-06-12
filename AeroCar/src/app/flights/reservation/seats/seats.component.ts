import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AvioService } from 'src/app/services/avio.service';
import { ReservationService } from 'src/app/services/reservation.service';

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

  constructor(private route: ActivatedRoute, private avioService: AvioService, private reservationService: ReservationService, private router: Router, private zone: NgZone) {
    this.reservationId = this.route.snapshot.paramMap.get('reservationId');
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadReservationData();
  }

  ngOnInit(): void {
    var ret = this.avioService.getFlight(this.id);
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.flight = data.body["flight"];
          this.company = data.body["company"];
      });
      },
      err => {
      });

    var ret = this.avioService.getAeroplaneByFlightId(this.id);
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.seats = data.body["aeroplane"].seats;
          this.seatCount = Array.from(Array(this.seats.seatCount / this.seats.inOneRow).keys());
          this.rowCount = Array.from(Array(this.seats.inOneRow).keys());
        });
      },
      err => {
      });
  }

  loadReservationData(): void {
    var ret = this.reservationService.loadFlightReservationData(this.reservationId);
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.reservation = data.body["reservation"];
      });
      },
      err => {
        this.router.navigateByUrl("/flights");
      });

    var ret = this.reservationService.loadFlightSeatsTaken(this.id);
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.takenSeats = data.body["takenSeats"];
      });
      },
      err => {
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
    var data = {
      "reservationId": parseInt(this.reservationId),
      "seat": seat
    };

    var jsonized = JSON.stringify(data);
    var ret = this.reservationService.reserveFlightStepTwo(jsonized);
    
    ret.subscribe(data => {
        this.router.navigateByUrl("/flights/reservation/" + this.flight.flightId + "/" + this.reservationId + "/details");
      },
      err => {
      });
  }

  cancel(): void {
    var ret = this.reservationService.cancelFlightReservation(this.reservationId);
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.router.navigateByUrl("/flights");
      });
      },
      err => {
      });
  }

}
