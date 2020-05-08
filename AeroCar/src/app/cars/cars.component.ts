import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  listContainsItems: boolean;
  filtersShown: boolean;

  btnFiltersText: string;

  constructor() {
    this.listContainsItems = false;
    this.filtersShown = false;
    this.btnFiltersText = "+ Filters";
  }

  ngOnInit(): void {
  }

  searchForFlights(): void {
    this.listContainsItems = true;
  }

  toggleFilters(): void {
    this.filtersShown = !this.filtersShown;
    
    if (this.filtersShown) {
      this.btnFiltersText = "- Filters";
    } else {
      this.btnFiltersText = "+ Filters";
    }
  }

}
