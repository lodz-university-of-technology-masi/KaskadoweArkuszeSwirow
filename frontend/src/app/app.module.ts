import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule, MatChipsModule} from '@angular/material';
import {AddUserDialog} from './users/users.component';
import {AddQuestionDialog} from './questions/questions.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu';
import {MenuComponent} from './menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthenticationService} from './authentication.service';
import {NavbarComponent} from './navbar/navbar.component';
import {HomePageComponent} from './home-page/home-page.component';
import {UsersListComponent} from './users-list/users-list.component';
import {ChangePasswordDialog} from './login/login.component';
import {CreateNewUserDialog} from './users-list/users-list.component';
import { QuestionsComponent } from './questions/questions.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TestsComponent, CreateNewTestDialog } from './tests/tests.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { AddQuestionToTestDialog } from './test-details/test-details.component'
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AddUserDialog,
    AddQuestionDialog,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomePageComponent,
    UsersListComponent,
    ChangePasswordDialog,
    CreateNewUserDialog,
    QuestionsComponent,
    TestsComponent,
    TestDetailsComponent,
    CreateNewTestDialog,
    AddQuestionToTestDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgbModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: [AddUserDialog,
    AddQuestionDialog,
    ChangePasswordDialog,
    CreateNewUserDialog,
    CreateNewTestDialog,
    AddQuestionToTestDialog]
})
export class AppModule {
}
