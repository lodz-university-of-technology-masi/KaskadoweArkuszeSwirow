import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth-guard.service';
import { CandidateGuard } from '../shared/guards/candidate-guard.service'
import { LayoutComponent } from './layout/layout.component';
import { SolveTestComponent } from './solve-test/solve-test.component';
import { TestsForUserComponent } from './tests-for-user/tests-for-user.component';
import { TestStatusComponent } from './test-status/test-status.component';


export const candidateRoutes: Routes = [
  {
    path: 'candidate',
    component: LayoutComponent,
    canActivate: [AuthGuard, CandidateGuard],
    children: [
      {
        path: 'solve-test/:id',
        component: SolveTestComponent,
        canActivate: [AuthGuard, CandidateGuard]
      },
      {
        path: 'my-tests',
        component: TestsForUserComponent,
        canActivate: [AuthGuard, CandidateGuard]
      },
      {
        path: 'test-status/:id',
        component: TestStatusComponent,
        canActivate: [AuthGuard, CandidateGuard]
      }
    ]
  }
];
