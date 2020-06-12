import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SystemService {

  constructor(public http: HttpClient) { }

  isSystemAdmin() {
    var ret = this.http.get("http://localhost:62541/api/system/check", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  getAvioCompanies() {
    var ret = this.http.get("http://localhost:62541/api/system/avio/get/all", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  addAvioCompany(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/system/avio/create", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  removeAvioCompany(id: string) {
    var ret = this.http.post("http://localhost:62541/api/system/avio/remove/" + id, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });
    
    return ret;
  }

  getCarCompanies() {
    var ret = this.http.get("http://localhost:62541/api/system/car/get/all", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  addCarCompany(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/system/car/create", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  removeCarCompany(id: number) {
    var ret = this.http.post("http://localhost:62541/api/system/car/remove/" + id, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });
      
    return ret;
  }

  getAdmins() {
    var ret = this.http.get("http://localhost:62541/api/system/admin/get/all", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

  addAvioAdmin(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/system/admin/avio/create", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  removeAvioAdmin(id: number) {
    var ret = this.http.post("http://localhost:62541/api/system/admin/avio/remove/" + id, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

  addCarAdmin(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/system/admin/car/create", jsonized, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });
    
    return ret;
  }

  removeCarAdmin(id: number) {
    var ret = this.http.post("http://localhost:62541/api/system/admin/car/remove/" + id, null, { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      responseType: 'json' });

    return ret;
  }

}
