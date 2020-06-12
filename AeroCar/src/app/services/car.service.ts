import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  constructor(public http: HttpClient) { }

  getCompanies() {
    var ret = this.http.get("http://localhost:62541/api/car/company/get", {
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });
    
    return ret;
  }

  getCompany(id: number) {
    var ret = this.http.get("http://localhost:62541/api/car/company/details/get/" + id, {
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  searchCars(param: HttpParams) {
    var ret = this.http.get("http://localhost:62541/api/car/search", {
      params: param,
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }
  
}
