import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth-guard.service';
import { CandidateGuard } from '../shared/guards/candidate-guard.service'
import { LayoutComponent } from './layout/layout.component';


export const candidateRoutes: Routes = [
  {
    path: 'candidate',
    component: LayoutComponent,
    canActivate: [AuthGuard, CandidateGuard],
  }
];
