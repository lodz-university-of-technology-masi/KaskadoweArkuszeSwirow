import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomePageComponent } from '../home-page/home-page.component';
// import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { CandidateGuard } from '../shared/guards/candidate-guard.service'
import { RecruiterGuard } from '../shared/guards/recruiter-guard.service'

export const dashboardRoutes: Routes = [
  {
    path: 'candidate',
    component: HomePageComponent,
    canActivate: [AuthGuard, CandidateGuard],
    children: [
      // { path: '', redirectTo: 'lay', canActivate: [RoleGuard], pathMatch: 'full' },
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: '', component: HomePageComponent},

      // { path: 'lay', component: LayoutComponent, canActivate: [RoleGuard]},
      // { path: '', component: HomePageComponent, canActivate: [AuthGuard]},
      

      // {
      //   path: 'admin', component: AdminComponent,
      //   data: {role: 'Admin'},
      //   canActivate: [RoleGuard]
      // }
    ]
  },
  {
    path: 'recruiter',
    component: HomePageComponent,
    canActivate: [AuthGuard, RecruiterGuard],
    children: [
      // { path: '', redirectTo: 'lay', canActivate: [RoleGuard], pathMatch: 'full' },
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: '', component: HomePageComponent},

      // { path: 'lay', component: LayoutComponent, canActivate: [RoleGuard]},
      // { path: '', component: HomePageComponent, canActivate: [AuthGuard]},
      

      // {
      //   path: 'admin', component: AdminComponent,
      //   data: {role: 'Admin'},
      //   canActivate: [RoleGuard]
      // }
    ]
  },
  {
    path: 'home',
    // redirectTo: 'recruiter',
    // pathMatch: 'full',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    
    // children: [

    // ]
  },
];
