import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loading: boolean;
  public failed: boolean;

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(form: NgForm): void {
    console.log(form);
    var jsonized = JSON.stringify(form.value);
    console.log(jsonized);
    this.loading = true;
    this.failed = false;
    var ret = this.http.post("http://localhost:62541/api/user/login", jsonized, { 
      headers: {'Content-Type': 'application/json'},
      observe: 'response',
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        this.loading = false;
        this.router.navigateByUrl('/profile');
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
