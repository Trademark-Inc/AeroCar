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
  public loading1: boolean;
  public failed1: boolean;
  public success1: boolean;
  public errorAddFriend: string;
  public errorAddFriendInfo: string;

  public loading2: boolean;
  public failed2: boolean;
  public success2: boolean;
  public errorRemoveFriend: string;
  public errorRemoveFriendInfo: string;

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
    this.loading1 = true;
    this.failed1 = false;
    this.success1 = false;

    var ret = this.userService.addFriend(form.value.username);
    
    ret.subscribe(data => {
        this.loadFriends();
        this.loading1 = false;
        this.success1 = true;
      },
      err => {
        this.loading1 = false;
        this.failed1 = true;
        this.errorAddFriend = err.error;
        this.errorAddFriendInfo = err.status + " " + err.statusText;
      });
  }

  removeFriend(form: NgForm): void {
    this.loading2 = true;
    this.failed2 = false;
    this.success2 = false;

    var ret = this.userService.removeFriend(form.value.username);
    
    ret.subscribe(data => {
      this.loadFriends();
      this.loading2 = false;
      this.success2 = true;
      },
      err => {
        this.loading2 = false;
        this.failed2 = true;
        this.errorRemoveFriend = err.error;
        this.errorRemoveFriendInfo = err.status + " " + err.statusText;
      });
  }

}
