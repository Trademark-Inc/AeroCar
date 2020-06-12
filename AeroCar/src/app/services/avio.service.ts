import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvioService {

  constructor(public http: HttpClient) { }

  getCompanies() {
    var ret = this.http.get("http://localhost:62541/api/avio/company/get", {
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getCompany(id: number) {
    var ret = this.http.get("http://localhost:62541/api/avio/company/details/get/" + id, {
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });
    
    return ret;
  }

  searchFlights(param: HttpParams) {
    var ret = this.http.get("http://localhost:62541/api/flight/search", {
      params: param,
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getFlight(id: number) {
    var ret = this.http.get("http://localhost:62541/api/flight/" + id, {
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getAeroplaneByFlightId(id: number) {
    var ret = this.http.get("http://localhost:62541/api/flight/" + id + "/aeroplane", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

}
