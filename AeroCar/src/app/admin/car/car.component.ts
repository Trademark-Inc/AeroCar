import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Bar chart init
    var canvas = <HTMLCanvasElement> document.getElementById("myChart");
    var ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{
                label: 'Revenue',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(0, 0, 0, 0.2)'
                ],
                borderColor: [
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(0, 0, 0, 0.2)'
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
