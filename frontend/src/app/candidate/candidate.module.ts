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
import { CandidateGuard } from '../shared/guards/candidate-guard.service'

import { candidateRoutes } from './candidate-routing.module';
import { MenuComponent } from './layout/navbar/menu/menu.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { TestResultsComponent } from './test-results/test-results.component';


@NgModule({
  declarations: [
    MenuComponent, 
    NavbarComponent,
    LayoutComponent,
    TestResultsComponent, 
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(candidateRoutes),
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    CandidateGuard
  ]
})
export class CandidateModule { }
