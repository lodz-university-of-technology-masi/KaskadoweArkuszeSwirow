import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth-guard.service';
import { RecruiterGuard } from '../shared/guards/recruiter-guard.service'
// import {SampleComponent} from './sample/sample.component'
import { LayoutComponent } from './layout/layout.component';
import { UsersListComponent } from './users-list/users-list.component';
import { TestsComponent } from './tests/tests.component';
import { TestDetailsComponent } from './tests/test-details/test-details.component';
import { QuestionsComponent } from './questions/questions.component';
import { TestCreateComponent } from './tests/test-create/test-create.component';


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
        canActivate: [AuthGuard, RecruiterGuard]
      },
      {
        path: 'tests',
        component: TestsComponent,
        canActivate: [AuthGuard, RecruiterGuard]
      },
      {
        path: 'test-details/:id',
        component: TestDetailsComponent,
        canActivate: [AuthGuard, RecruiterGuard]
      },
      {
        path: 'test-create',
        component: TestCreateComponent,
        canActivate: [AuthGuard, RecruiterGuard]
      },
      {
        path: 'questions',
        component: QuestionsComponent,
        canActivate: [AuthGuard, RecruiterGuard]
      },
    ]
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class RecruiterRoutingModule { }
