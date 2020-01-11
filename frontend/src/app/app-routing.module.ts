import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './recruiter/register/register.component';
// import { UsersListComponent } from './recruiter/users-list/users-list.component';
// import { QuestionsComponent } from './recruiter/questions/questions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


export const APP_ROUTES: Routes = [
  // {path: '', component: HomePageComponent},
  // {path: 'users', component: UsersComponent},
  // {path: 'register', component: RegisterComponent},
  
  // {path: 'usersList', component: UsersListComponent},
  // {path: 'questions', component: QuestionsComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];


// const routes: Routes = [
//   // {path: '', component: HomePageComponent},
//   // {path: 'users', component: UsersComponent},
//   // {path: 'register', component: RegisterComponent},
  
//   // {path: 'usersList', component: UsersListComponent},
//   // {path: 'questions', component: QuestionsComponent},
//   {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
//   {path: 'login', component: LoginComponent},
//   {path: '**', component: PageNotFoundComponent}
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(APP_ROUTES)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

