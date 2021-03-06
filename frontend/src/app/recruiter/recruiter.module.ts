import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material'; 
import { MatDialogModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { RecruiterGuard } from '../shared/guards/recruiter-guard.service'
import { recruiterRoutes } from './recruiter-routing.module';
import { MenuComponent } from './layout/navbar/menu/menu.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateNewUserDialog } from './users-list/users-list.component';
import { ChooseTestDialogComponent } from './tests-for-users/choose-test-dialog/choose-test-dialog.component';
import { ShowTestsWithStatus } from './tests-for-users/show-tests-with-status/show-tests-with-status.component';
import { TestsForUsersComponent } from './tests-for-users/tests-for-users.component';
import { CheckTestComponent } from './tests-for-users/check-test/check-test.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    MenuComponent, 
    LayoutComponent, 
    NavbarComponent, 
    UsersListComponent, 
    RegisterComponent,
    CreateNewUserDialog, TestsForUsersComponent, ChooseTestDialogComponent, ShowTestsWithStatus, CheckTestComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(recruiterRoutes),
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatSnackBarModule
    
    // RecruiterRoutingModule
  ],
  providers: [
    AuthGuard,
    RecruiterGuard,
    // MatSnackBar
  ],
  entryComponents: [
    CreateNewUserDialog,
    ChooseTestDialogComponent
  ]
})
export class RecruiterModule { }
