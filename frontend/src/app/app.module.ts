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
import {MatInputModule, MatChipsModule, MatTabsModule} from '@angular/material';
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
import { TestsComponent } from './tests/tests.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TestCreateComponent } from './test-create/test-create.component';
import { TestAddQuestionDialogComponent } from './test-add-question-dialog/test-add-question-dialog.component';
import { TestsForUserComponent } from './tests-for-user/tests-for-user.component';
import { SolveTestComponent } from './solve-test/solve-test.component';

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
    TestCreateComponent,
    TestAddQuestionDialogComponent,
    TestsForUserComponent,
    SolveTestComponent
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
    MatChipsModule,
    MatTabsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: [AddUserDialog,
    AddQuestionDialog,
    ChangePasswordDialog,
    CreateNewUserDialog,
    TestAddQuestionDialogComponent]
})
export class AppModule {
}
