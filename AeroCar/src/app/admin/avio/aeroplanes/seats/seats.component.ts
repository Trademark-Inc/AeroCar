import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AvioAdminService } from 'src/app/services/avioadmin.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class AvioSeatsComponent implements OnInit {

  seats: any;
  id: any;
  deletedSeats: number[];
  seatCount: number[];
  rowCount: number[];

  constructor(private route: ActivatedRoute, private avioAdminService: AvioAdminService, private router: Router, private zone: NgZone) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    var ret = this.avioAdminService.getCompanyProfile();
    
    ret.subscribe(data => {
        this.zone.run(() => {
          data.body["avioCompany"].aeroplanes.forEach(element => {
            if (element.aeroplaneId == this.id) {
              this.seats = element.seats; 
            }
          });
          this.seatCount = Array.from(Array(this.seats.seatCount / this.seats.inOneRow).keys());
          this.rowCount = Array.from(Array(this.seats.inOneRow).keys());
        });
      },
      err => {
      });
  }

  addRemoveSeat(clickedElement: any, seatNumber: number): void {
    clickedElement.bgColor = "red";
  }

}
