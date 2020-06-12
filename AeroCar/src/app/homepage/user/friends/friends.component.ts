import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: any;

  constructor(private userService: UserService, private router: Router, public zone: NgZone) {
    this.loadFriends();
  }

  ngOnInit(): void {
  }

  loadFriends(): void {
    var ret = this.userService.getFriends();
    
    ret.subscribe(data => {
        this.zone.run(() => 
        {
          this.friends = data.body;
        });
      },
      err => {
        this.router.navigateByUrl("");
      });
  }

  addFriend(form: NgForm): void {
    var ret = this.userService.addFriend(form.value.username);
    
    ret.subscribe(data => {
        this.loadFriends();
      },
      err => {
      });
  }

  removeFriend(form: NgForm): void {
    var ret = this.userService.removeFriend(form.value.username);
    
    ret.subscribe(data => {
      this.loadFriends();
      },
      err => {
      });
  }

}
