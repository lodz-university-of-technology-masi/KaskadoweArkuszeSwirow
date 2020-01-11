import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatMenuModule} from '@angular/material/menu'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button'; 


import { AuthGuard } from '../shared/guards/auth-guard.service';
import { RecruiterGuard } from '../shared/guards/recruiter-guard.service'

import { recruiterRoutes } from './recruiter-routing.module';
import { SampleComponent } from './sample/sample.component';
import { MenuComponent } from './layout/navbar/menu/menu.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';



@NgModule({
  declarations: [SampleComponent, MenuComponent, LayoutComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(recruiterRoutes),
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule
    // RecruiterRoutingModule
  ],
  providers: [
    AuthGuard,
    RecruiterGuard
  ]
})
export class RecruiterModule { }
