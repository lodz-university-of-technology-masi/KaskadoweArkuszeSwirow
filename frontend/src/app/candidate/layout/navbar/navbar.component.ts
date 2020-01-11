import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../shared/authentication.service';


@Component({
  selector: 'candidate-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _authService: AuthenticationService, private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    this._authService.logOut();
    console.log('Logged out');
    this._router.navigateByUrl('/login');
  }

}
