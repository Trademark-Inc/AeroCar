import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(public http: HttpClient) { }

  getUserProfile() {
    var ret = this.http.get("http://localhost:62541/api/user/current", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getFriends() {
    var ret = this.http.get("http://localhost:62541/api/user/friends", {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getFlightHistory() {
    var ret = this.http.get("http://localhost:62541/api/user/history/flights", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getFlightReservations() {
    var ret = this.http.get("http://localhost:62541/api/user/reservations/flights", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getRateableFlights() {
    var ret = this.http.get("http://localhost:62541/api/user/history/flights/rating", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getCarsHistory() {
    var ret = this.http.get("http://localhost:62541/api/user/history/cars", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getCarReservations() {
    var ret = this.http.get("http://localhost:62541/api/user/reservations/cars", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getRateableCars() {
    var ret = this.http.get("http://localhost:62541/api/user/history/vehicles/rating", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getInvitations() {
    var ret = this.http.get("http://localhost:62541/api/user/flight/invitations", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  addFriend(username: string) {
    var ret = this.http.post("http://localhost:62541/api/user/friends/add/" + username, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  removeFriend(username: string) {
    var ret = this.http.post("http://localhost:62541/api/user/friends/remove/" + username, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  acceptInvitation(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/invite/response", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });
    
    return ret;
  }

  rejectInvitation(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/reservation/flight/invite/response", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  cancelFlightReservation(id: number) {
    var ret = this.http.get("http://localhost:62541/api/reservation/flight/remove/" + id, {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  cancelCarReservation(id: number) {
    var ret = this.http.get("http://localhost:62541/api/reservation/car/remove/" + id, {
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  rateAvioFlight(jsonized: string, reservationId: number) {
    var ret = this.http.post("http://localhost:62541/api/user/rate/" + reservationId, jsonized, { 
      headers: {'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + localStorage.getItem("token")},    
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  rateCarVehicle(jsonized: string, reservationId: number) {
    var ret = this.http.post("http://localhost:62541/api/user/rate/vehicle/" + reservationId, jsonized, { 
      headers: {'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + localStorage.getItem("token")},    
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

}
