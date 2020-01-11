import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../shared/authentication.service';
import {MatMenuModule} from '@angular/material/menu'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}
