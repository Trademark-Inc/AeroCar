import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  listContainsItems: boolean;

  constructor() {
    this.listContainsItems = false;
  }

  ngOnInit(): void {
  }

  searchForFlights(): void {
    this.listContainsItems = true;
  }

}
