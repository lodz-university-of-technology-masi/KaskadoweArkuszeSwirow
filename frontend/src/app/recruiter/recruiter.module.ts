import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatMenuModule} from '@angular/material/menu'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatDialogModule} from '@angular/material';
import { FormsModule } from '@angular/forms';


import { AuthGuard } from '../shared/guards/auth-guard.service';
import { RecruiterGuard } from '../shared/guards/recruiter-guard.service'

import { recruiterRoutes } from './recruiter-routing.module';
import { SampleComponent } from './sample/sample.component';
import { MenuComponent } from './layout/navbar/menu/menu.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateNewUserDialog } from './users-list/users-list.component'



@NgModule({
  declarations: [
    SampleComponent, 
    MenuComponent, 
    LayoutComponent, 
    NavbarComponent, 
    UsersListComponent, 
    CreateNewUserDialog
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(recruiterRoutes),
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule
    // RecruiterRoutingModule
  ],
  providers: [
    AuthGuard,
    RecruiterGuard
  ],
  entryComponents: [
    CreateNewUserDialog
  ]
})
export class RecruiterModule { }
