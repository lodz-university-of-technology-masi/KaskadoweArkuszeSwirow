import {Component, Inject} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


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
  }

  onSubmit(form: NgForm) {
    this.email = form.value.email;
    this.password = form.value.password;
    this.logIn(form.value.email, form.value.password, this.newPassword);
  }

  logIn(email, password, newPassword) {
    this.auth.signIn(email, password, newPassword).subscribe((data) => {
      if (data == null) {
        this._router.navigateByUrl('/usersList');
      } else {
        this.openDialog();
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

