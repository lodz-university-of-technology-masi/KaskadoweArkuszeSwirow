import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatChipsModule, MatTabsModule, MatRadioModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent, ConfirmCodeDialog, ChangePasswordDialog } from './login/login.component';
import { QuestionsComponent, AddQuestionDialog } from './recruiter/questions/questions.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecruiterModule } from './recruiter/recruiter.module';
import { CandidateModule } from './candidate/candidate.module';
import { TestsComponent } from './recruiter/tests/tests.component';
import { TestDetailsComponent } from './recruiter/tests/test-details/test-details.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TestCreateComponent } from './recruiter/tests/test-create/test-create.component';
import { TestAddQuestionDialogComponent } from './recruiter/tests/test-add-question-dialog/test-add-question-dialog.component';
import { TestsForUserComponent } from './candidate/tests-for-user/tests-for-user.component';
import { SolveTestComponent } from './candidate/solve-test/solve-test.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordDialog,
    ConfirmCodeDialog,
    AddQuestionDialog,
    PageNotFoundComponent,
    // CreateNewUserDialog,
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
    // AppRoutingModule,
    RouterModule.forRoot(APP_ROUTES),
    CandidateModule,
    RecruiterModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTabsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    // AddUserDialog,
    AddQuestionDialog,
    ChangePasswordDialog,
    ConfirmCodeDialog,
    // CreateNewUserDialog,
    TestAddQuestionDialogComponent]
})
export class AppModule {
}
