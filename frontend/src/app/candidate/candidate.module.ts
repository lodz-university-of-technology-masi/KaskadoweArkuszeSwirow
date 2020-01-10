import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth-guard.service';
import { CandidateGuard } from '../shared/guards/candidate-guard.service'

import { candidateRoutes } from './candidate-routing.module';
import { SampleComponent } from './sample/sample.component';


@NgModule({
  declarations: [SampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(candidateRoutes)
  ],
  providers: [
    AuthGuard,
    CandidateGuard
  ]
})
export class CandidateModule { }
