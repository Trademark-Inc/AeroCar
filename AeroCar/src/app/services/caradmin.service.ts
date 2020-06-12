import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CarAdminService {

  constructor(public http: HttpClient) { }

  getCompanyProfile() {
    var ret = this.http.get("http://localhost:62541/api/caradmin/company/get/profile", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });
    
    return ret;
  }

  updateCompanyProfile(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/update/profile", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });
    
    return ret;
  }

  getCompanyReport() {
    var ret = this.http.get("http://localhost:62541/api/caradmin/company/get/report", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getOffices() {
    var ret = this.http.get("http://localhost:62541/api/caradmin/company/get/offices", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });
    
    return ret;
  }

  addOffice(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/create/office", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });
    
    return ret;
  }

  removeOffice(id: number) {
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/remove/office/" + id, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  getVehicles() {
    var ret = this.http.get("http://localhost:62541/api/caradmin/company/get/vehicles", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  addVehicle(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/create/vehicle", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });
    
    return ret;
  }

  removeVehicle(id: number) {
    var ret = this.http.post("http://localhost:62541/api/caradmin/company/remove/vehicle/" + id, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

}
