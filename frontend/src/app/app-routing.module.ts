import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersListComponent } from './users-list/users-list.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'users', component: UsersComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
  {path: 'usersList', component: UsersListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
