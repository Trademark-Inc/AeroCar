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

}
