import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AvioService } from 'src/app/services/avio.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  @ViewChild('confirmModal') private confirmModal: ElementRef;

  reservationId: any;
  reservation: any;
  id: any;
  flight: any;
  friends: any;
  returnFlights: any;
  showAdditional: boolean;
  loading: boolean;
  success: boolean;
  failed: boolean;
  errorConfirmReservation: string;
  errorConfirmReservationInfo: string;

  constructor(private route: ActivatedRoute, private avioService: AvioService, private reservationService: ReservationService, 
    private userService: UserService, private router: Router, private zone: NgZone) {
    this.reservationId = this.route.snapshot.paramMap.get('reservationId');
    this.id = this.route.snapshot.paramMap.get('id');
    this.showAdditional = false;
    this.loadReservationData();
    if (localStorage.getItem("returnFlights") != null)
      this.returnFlights = JSON.parse(localStorage.getItem("returnFlights"));
    else
      this.returnFlights = null;
  }

  ngOnInit(): void {
  }

  loadReservationData(): void {
    var ret = this.reservationService.loadFlightReservationData(this.reservationId);
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.reservation = data.body["reservation"];
          if (this.reservation.name != null && this.reservation.surname != null && this.reservation.passport != null && 
            this.reservation.name != "" && this.reservation.surname != "" && this.reservation.passport != "") {
              this.showAdditional = true;
            }
      });
      },
      err => {
        this.router.navigateByUrl("/flights");
      });

    var ret = this.avioService.getFlight(this.id);
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.flight = data.body["flight"];
      });
      },
      err => {
        this.router.navigateByUrl("/flights");
      });
  }

  confirm(form: NgForm): void {

    var data = {
      "reservationId": parseInt(this.reservationId),
      "name": form.value["name"],
      "surname": form.value["surname"],
      "passport": form.value["passport"],
    };

    var jsonized = JSON.stringify(data);
    var ret = this.reservationService.reserveFlightStepThree(jsonized);
    
    this.loading = true;
    this.success = false;
    this.failed = false;

    ret.subscribe(data => {
      this.loading = false;
      this.success = true;
      this.showAdditional = true;
      },
    err => {
      this.loading = false;
      this.failed = true;
      this.errorConfirmReservation = err.error;
      this.errorConfirmReservationInfo = err.status + " " + err.statusText;
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

  loadFriends(): void {
    var ret = this.userService.getFriends();
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.friends = data.body;
      });
      },
      err => {
        this.router.navigateByUrl("/flights");
      });
  }

  invite(form: NgForm): void {

    var data = {
      "flightId": parseInt(this.id),
      "id": parseInt(this.reservationId),
      "friendUsername": form.value["username"]
    };

    var jsonized = JSON.stringify(data);
    var ret = this.reservationService.inviteToFlight(jsonized);
    
    ret.subscribe(data => {
      // TODO: loader and success
      },
      err => {
        // TODO: failed
      });
  }

  reserve(): void {
    this.router.navigateByUrl("/flights/reservation/" + this.id);
  }

  reserveReturn(id: number) {
    localStorage.removeItem("returnFlights");
    this.router.navigateByUrl("/flights/reservation/" + id);
  }

}
