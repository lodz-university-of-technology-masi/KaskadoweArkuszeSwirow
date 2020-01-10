import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth-guard.service';
import { CandidateGuard } from '../shared/guards/candidate-guard.service'
import {SampleComponent} from './sample/sample.component'



export const candidateRoutes: Routes = [
  {
    path: 'candidate',
    component: SampleComponent,
    canActivate: [AuthGuard, CandidateGuard],
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class CandidateRoutingModule { }
