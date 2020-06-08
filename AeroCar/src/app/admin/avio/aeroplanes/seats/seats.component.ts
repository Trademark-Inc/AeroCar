import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private zone: NgZone) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    var ret = this.http.get("http://localhost:62541/api/avioadmin/company/get/profile", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        console.log(this.id);
        this.zone.run(() => {
          data.body["avioCompany"].aeroplanes.forEach(element => {
            if (element.aeroplaneId == this.id) {
              this.seats = element.seats; 
            }
          });
          // this.seats = data.body["avioCompany"].aeroplanes.filter(item => item.aeroplaneId === this.id).seats;
          this.seatCount = Array.from(Array(this.seats.seatCount / this.seats.inOneRow).keys());
          this.rowCount = Array.from(Array(this.seats.inOneRow).keys());
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  addRemoveSeat(clickedElement: any, seatNumber: number): void {
    console.log(clickedElement);
    clickedElement.bgColor = "red";
  }

}
