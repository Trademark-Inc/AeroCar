import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router,
        // import as RouterEvent to avoid confusion with the DOM Event
        Event as RouterEvent,
        NavigationStart,
        NavigationEnd,
        NavigationCancel,
        NavigationError } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
