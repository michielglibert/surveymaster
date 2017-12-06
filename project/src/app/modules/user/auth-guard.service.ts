import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate{
  //Checks if user is logged in
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(this.authService.user$.getValue()) {
      return true;
    } else {
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/login'])
      return false;
    }
  }


  constructor(private authService:AuthenticationService, private router:Router) { }

}
