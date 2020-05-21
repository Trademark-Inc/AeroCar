import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public loading: boolean;
  public success: boolean;
  public failed: boolean;

  constructor(public http: HttpClient) {
    this.loading = false;
  }

  ngOnInit(): void {
  }

  signUp(form: NgForm): void {
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    this.loading = true;
    this.success = false;
    this.failed = false;
    var ret = this.http.post("http://localhost:62541/api/user/register", jsonized, { 
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        this.loading = false;
        this.success = true;
      },
      err => {
        console.log("ERROR");
        console.log(err);
        this.loading = false;
        this.failed = true;
      });
    console.log(ret);
  }

}
