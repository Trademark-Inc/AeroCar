import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public loading: boolean;
  public success: boolean;
  public failed: boolean;

  constructor(private userService: UserService) {
    this.loading = false;
  }

  ngOnInit(): void {
  }

  signUp(form: NgForm): void {
    var jsonized = JSON.stringify(form.value);

    this.loading = true;
    this.success = false;
    this.failed = false;

    var ret = this.userService.register(jsonized);
    
    ret.subscribe(data => {
        this.loading = false;
        this.success = true;
      },
      err => {
        this.loading = false;
        this.failed = true;
      });
  }

}
