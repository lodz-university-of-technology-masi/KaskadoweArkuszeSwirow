import {Component, Inject} from '@angular/core';
import {AuthenticationService} from '../shared/authentication.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

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
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
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
    // this.logIn(form.value.email, form.value.password, this.newPassword);
    this.logIn(form.value.email, form.value.password, null);

  }

  //TODO: CHANGE IT TO WORK PROPERLY AFTER NEW CANDIDATE PASSWORD CHANGE
  logIn(email, password, newPassword) {
    this.auth.signIn(email, password, newPassword).subscribe((data) => {
      
      if(data != null) {
        this.openNewPasswordDialog();
      }
      else{
        console.log('Redirecting');

        //make it like in constructor also with throw
        if(this.auth.getAuthenticatedUserRole() == '0') {
          console.log('Moving to /recruiter');
          this._router.navigate(['/recruiter']);
        }
        else {
          console.log('Moving to /candidate');
          this._router.navigate(['/candidate']);
        }
      }
    }, (err) => {
      console.log(err);

      if(err.code == "UserNotConfirmedException"){
        this.openConfirmCodeDialog();
      }
      else {
        this.emailVerificationMessage = true;
      }
    });
  }

  openNewPasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialog, {
      width: '250px',
      data: {newPassword: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.newPassword = result;
      this.logIn(this.email, this.password, result);
    });
  }

  openConfirmCodeDialog(): void {
    const dialogRef = this.dialog.open(ConfirmCodeDialog, {
      width: '250px',
      data: {
        emailConfirm: '',
        confirmCode: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if(result) {
        this.auth.confirmAuthCode(result.emailConfirm, result.confirmCode).subscribe(
          (res) => {
            this.openSnackBar('Success!', 'OK');
            console.log(res);
          },
          (err) => {
            this.openSnackBar(err.message, 'OK');
            console.log(err);
          });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
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

@Component({
  selector: 'confirm-code-dialog',
  templateUrl: 'confirm-code-dialog.html'
})
export class ConfirmCodeDialog {
  emailConfirm;
  confirmCode;
  constructor(
    public dialogRef: MatDialogRef<ConfirmCodeDialog>,
    @Inject (MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
