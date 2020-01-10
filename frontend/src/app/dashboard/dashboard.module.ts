import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { RecruiterGuard } from '../shared/guards/recruiter-guard.service'
import { LayoutComponent } from '../layout/layout.component';
import { HomePageComponent } from '../home-page/home-page.component';




@NgModule({
  declarations: [HomePageComponent, LayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  providers: [
    AuthGuard,
    RecruiterGuard
  ],
})
export class DashboardModule { }
