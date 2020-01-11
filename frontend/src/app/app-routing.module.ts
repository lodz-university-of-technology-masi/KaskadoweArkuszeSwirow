import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { RegisterComponent } from './register/register.component';
// import { HomePageComponent } from './home-page/home-page.component';
// import { UsersListComponent } from './users-list/users-list.component';
// import { QuestionsComponent } from './questions/questions.component';
// import { TestsComponent } from './tests/tests.component';
// import { TestDetailsComponent } from './test-details/test-details.component';
// import { TestCreateComponent } from './test-create/test-create.component';
// import { TestsForUserComponent } from './tests-for-user/tests-for-user.component';
// import { SolveTestComponent } from './solve-test/solve-test.component';

export const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
  // {path: '', component: HomePageComponent},
  // {path: 'tests', component: TestsComponent},
  // {path: 'test-details/:id', component: TestDetailsComponent},
  // {path: 'users', component: UsersListComponent},
  // {path: 'register', component: RegisterComponent},
  // {path: 'usersList', component: UsersListComponent},
  // {path: 'questions', component: QuestionsComponent},
  // {path: 'test-create', component: TestCreateComponent},
  // {path: 'solve-test/:id', component: SolveTestComponent},
  // {path: 'my-tests', component: TestsForUserComponent}

];
