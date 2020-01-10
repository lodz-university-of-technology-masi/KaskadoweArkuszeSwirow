import { AuthenticationService } from './../authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CandidateGuard implements CanActivate {


  constructor(private _authService: AuthenticationService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('CandidateGuard check');

    const userRole = this._authService.getAuthenticatedUserRole();

    if(userRole == '1') {
      return true;
    }
    else {
      this._router.navigate(['/recruiter']);
      return false;
    }
  }

}
