import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth-guard.service';
import { RecruiterGuard } from '../shared/guards/recruiter-guard.service'
// import {SampleComponent} from './sample/sample.component'
import { LayoutComponent } from './layout/layout.component';
import { UsersListComponent } from './users-list/users-list.component';


export const recruiterRoutes: Routes = [
  {
    path: 'recruiter',
    component: LayoutComponent,
    canActivate: [AuthGuard, RecruiterGuard],
    // canActivateChild: [AuthGuard, RecruiterGuard],
    children: [
      {
        path: 'candidates',
        component: UsersListComponent,
        canActivate: [AuthGuard, RecruiterGuard],
      }
    ]
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class RecruiterRoutingModule { }
