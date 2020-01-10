import {Component, Inject} from '@angular/core';
import {AuthenticationService} from '../shared/authentication.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { ConsoleReporter } from 'jasmine';


export interface DialogData {
  newPassword: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailVerificationMessage = false;
  email;
  password;
  newPassword = null;

  constructor(private auth: AuthenticationService,
              private _router: Router,
              public dialog: MatDialog) {
                console.log('LogIn component');

                if(auth.isLoggedIn()){

                  const role = this.auth.getAuthenticatedUserRole();
                  console.log(role);
                  if(role == '0') {
                    this._router.navigate(['/recruiter']);
                  }
                  else if(role =='1') {
                    this._router.navigate(['/candidate']);
                  }
                  else {
                    console.log('ERROR IN USERS ROLE!');
                    this._router.navigate(['/error']);
                  }
                }
  }

  onSubmit(form: NgForm) {
    this.email = form.value.email;
    this.password = form.value.password;
    this.logIn(form.value.email, form.value.password, this.newPassword);
  }

  logIn(email, password, newPassword) {
    this.auth.signIn(email, password, newPassword).subscribe((data) => {
      if(data != null) {
        this.openDialog();
      }

      //make it like in constructor also with throw
      if(this.auth.getAuthenticatedUserRole() == '0') {
        console.log('nooo');
        this._router.navigate(['/recruiter']);
      }
      else {
        this._router.navigate(['/candidate']);
      }
      
    }, (err) => {
      console.log(err);
      this.emailVerificationMessage = true;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialog, {
      width: '250px',
      data: {newPassword: this.newPassword}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newPassword = result;
      this.logIn(this.email, this.password, result);
    });
  }
}

@Component({
  selector: 'change-password-dialog',
  templateUrl: 'change-password-dialog.html'
})
export class ChangePasswordDialog {
  newPassword;
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialog>,
    @Inject (MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

