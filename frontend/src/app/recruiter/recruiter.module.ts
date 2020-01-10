import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth-guard.service';
import { RecruiterGuard } from '../shared/guards/recruiter-guard.service'

import { recruiterRoutes } from './recruiter-routing.module';
import { SampleComponent } from './sample/sample.component';


@NgModule({
  declarations: [SampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(recruiterRoutes),
    // RecruiterRoutingModule
  ],
  providers: [
    AuthGuard,
    RecruiterGuard
  ]
})
export class RecruiterModule { }
