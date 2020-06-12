import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  constructor(public http: HttpClient) { }

  reserveCar(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/reservation/car", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  loadFlightReservationData(reservationId: number) {
    var ret = this.http.get("http://localhost:62541/api/reservation/flight/" + reservationId, {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  loadFlightSeatsTaken(id: number) {
    var ret = this.http.get("http://localhost:62541/api/reservation/flight/" + id + "/seats/taken", {
        headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")},
        observe: 'response',
        withCredentials: true,
        responseType: 'json' });

    return ret;
  }

  reserveFlightStepOne(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/step/1", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  reserveFlightStepTwo(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/step/2", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  reserveFlightStepThree(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/step/3", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  cancelFlightReservation(reservationId: number) {
    var ret = this.http.get("http://localhost:62541/api/reservation/flight/remove/" + reservationId, {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  inviteToFlight(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/invite", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

}
