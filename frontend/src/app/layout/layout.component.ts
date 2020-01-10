import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

// import { AuthService } from '../../services/auth.service';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'app-layout',
  template: `
    <h1>Dashboard Layout</h1>
    <p>
      <a routerLink="home-page" >Home</a> |
      <button (click)="logout()"> Logout</button>
    </p>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class LayoutComponent implements OnInit {

  constructor(private _authService: AuthenticationService, private _router: Router) { console.log('Layout component');}

  ngOnInit() {
    console.log('LogIn ngoninit component');
  }

  logout() {
    this._authService.logOut();
    console.log('Logged out');
    this._router.navigateByUrl('/login');
  }

}
