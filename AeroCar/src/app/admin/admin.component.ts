import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router,
        // import as RouterEvent to avoid confusion with the DOM Event
        Event as RouterEvent,
        NavigationStart,
        NavigationEnd,
        NavigationCancel,
        NavigationError } from '@angular/router';
import { slider } from '../animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    slider
  ]
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      // $("body").animate({ scrollTop: 0 }, 1000);
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
