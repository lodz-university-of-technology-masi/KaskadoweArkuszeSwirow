import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/authentication.service';
import { Router } from '@angular/router';
import { UsersManagementService } from '../../shared/users-management.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogNewUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersListCognito = [];
  cognitoidentityserviceprovider;

  constructor(private auth: AuthenticationService,
              private _router: Router,
              private userService: UsersManagementService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  addCandidate() {
    if (this.auth.isLoggedIn()) {
      this.openDialog();
    }
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.userService.getAllCandidates().subscribe(
        (res) => {
          this.usersListCognito = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delete(username) {
    this.userService.deleteUser(username);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewUserDialog, {width: "350px",
      data: {email: '', firstName: '', lastName: '', password: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.auth.register(result.email, result.password, result.firstName, result.lastName, '1', this.auth.getAuthenticatedUser().getUsername()).subscribe(
          (res) => {
            console.log(res);
            this.openSnackBar('Candidate registered!', 'OK');
          },
          (err) => {
            console.log(err);
            this.openSnackBar(err.message, 'OK');
          }
        );
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
  selector: 'create-new-user-dialog',
  templateUrl: 'create-new-user-dialog.html'
})
export class CreateNewUserDialog {
  constructor(
    public dialogRef: MatDialogRef<CreateNewUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogNewUserData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
