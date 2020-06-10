import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable()

export class RoleGuardService implements CanActivate {  
  constructor(public auth: AuthService, public router: Router) {} 
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const role = localStorage.getItem("role");

      console.log(localStorage.getItem("role"));
    if (!this.auth.isAuthenticated() || role !== expectedRole) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}