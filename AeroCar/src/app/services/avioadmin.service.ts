import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AvioAdminService {

  constructor(public http: HttpClient) { }

  getCompanyProfile() {
    var ret = this.http.get("http://localhost:62541/api/avioadmin/company/get/profile", { 
                  headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")},
                  observe: 'response',
                  withCredentials: true,
                  responseType: 'json' });

    return ret;
  }

  updateCompanyProfile(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/update/profile", jsonized, { 
                  headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")},
                  observe: 'response',
                  responseType: 'json' });

    return ret;
  }

  addFlight(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/create/flight", jsonized, { 
        headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem("token")},
        observe: 'response',
        responseType: 'json' });
    
    return ret;
  }

  removeFlight(id: number) {
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/remove/flight/" + id, null, { 
                  headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")},
                  observe: 'response',
                  responseType: 'json' });

    return ret;
  }

  addBonusTicket(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/create/ticket", jsonized, { 
                  headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")},
                  observe: 'response',
                  responseType: 'json' });

    return ret;
  }

  removeBonusTicket(id: number) {
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/remove/ticket/" + id, null, { 
                  headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")},
                  observe: 'response',
                  responseType: 'json' });

    return ret;
  }

  addPriceListItem(jsonized: string) {
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/create/item", jsonized, { 
                  headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")},
                  observe: 'response',
                  responseType: 'json' });

    return ret;
  }

  removePriceListItem(id: number) {
    var ret = this.http.post("http://localhost:62541/api/avioadmin/company/remove/item/" + id, null, { 
                  headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")},
                  observe: 'response',
                  responseType: 'json' });

    return ret;
  }

  getCompanyReport() {
    var ret = this.http.get("http://localhost:62541/api/avioadmin/company/get/report", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' });

    return ret;
  }

}
