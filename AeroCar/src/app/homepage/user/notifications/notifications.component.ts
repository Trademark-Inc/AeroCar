import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  flightInvitations: any;

  constructor(private userService: UserService, private router: Router, private zone: NgZone) { 
    this.loadInvitations();
  }

  ngOnInit(): void {
  }

  loadInvitations(): void {
    var ret = this.userService.getInvitations();
    
    ret.subscribe(data => {
        this.zone.run(() => {
          this.flightInvitations = data.body["flightInvitations"];
        });
      },
      err => {
      });
  }

  accept(invitationId: number, flightId: number): void {
    
    var data = {
      "invitationId": invitationId,
      "accepted": true
    };

    var jsonized = JSON.stringify(data);
    var ret = this.userService.acceptInvitation(jsonized);
    
    ret.subscribe(data => {
        this.router.navigateByUrl("/flights/reservation/" + flightId);
      },
      err => {
      });

  }

  reject(invitationId: number): void {

    var data = {
      "invitationId": invitationId,
      "accepted": true
    };

    var jsonized = JSON.stringify(data);
    var ret = this.userService.rejectInvitation(jsonized);
    
    ret.subscribe(data => {
        this.loadInvitations();
      },
      err => {
      });

  }

}
