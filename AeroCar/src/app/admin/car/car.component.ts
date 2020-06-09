import { Component, OnInit, NgZone } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  public report: any;

  constructor(public http: HttpClient, private router: Router, private zone: NgZone) { 
    var ret = this.http.get("http://localhost:62541/api/caradmin/company/get/report", { 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")},
      observe: 'response',
      withCredentials: true,
      responseType: 'json' }).subscribe(data => {
        console.log("DATA");
        console.log(data);
        console.log(data.body);
        this.zone.run(() => {
          this.report = data.body;
          this.CreateChart();
        });
      },
      err => {
        console.log("ERROR");
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

  CreateChart(): void {
    var canvas = <HTMLCanvasElement> document.getElementById("myChart");
    var ctx = canvas.getContext("2d");

    var graphData = this.report.graph;

    var months = [];
    graphData.forEach(element => {
      months.push(element.month);
    });
    
    var values = [];
    graphData.forEach(element => {
      values.push(element.carReservations);
    });

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: '# of Car Reservations',
                data: values,
                backgroundColor: [
                  'rgba(52, 58, 64, 0.2)',
                  'rgba(52, 58, 64, 0.3)',
                  'rgba(52, 58, 64, 0.4)',
                  'rgba(52, 58, 64, 0.5)',
                  'rgba(52, 58, 64, 0.6)',
                  'rgba(52, 58, 64, 0.7)',
                ],
                borderColor: [
                  'rgba(0, 0, 0, 0.4)',
                  'rgba(0, 0, 0, 0.5)',
                  'rgba(0, 0, 0, 0.6)',
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(0, 0, 0, 0.8)',
                  'rgba(0, 0, 0, 0.9)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }

}
