import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  loggedIn: boolean;

  constructor() {
    this.loggedIn = this.userLoggedIn();
  }

  ngOnInit(): void {
  }

  userLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    }

    return false;
  }

}
