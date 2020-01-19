import { AuthenticationService } from '../authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RecruiterGuard implements CanActivate {


  constructor(private _authService: AuthenticationService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('RecruiterGuard check');
    
    const userRole = this._authService.getAuthenticatedUserRole();

    if(userRole == '0') {
      return true;
    }
    else {
      this._router.navigate(['/candidate']);
      return false;
    }
  }
}
