import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/authentication.service';
import {Router} from '@angular/router';
import {UsersManagementService} from '../../shared/users-management.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ChangePasswordDialog, DialogData} from '../../login/login.component';


export interface DialogNewUserData {
  email: string;
  firstName: string;
  lastName: string;
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
              public dialog: MatDialog) {
  }

  addCandidate() {
    if (this.auth.isLoggedIn()) {
      this.openDialog();

    }
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.userService.getUsers(this.auth.getAuthenticatedUser().getUsername()).subscribe((data) => {
          this.usersListCognito = data;
        }
      );
    }
  }

  delete(username) {
    this.userService.deleteUser(username);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewUserDialog, {width: "350px",
      data: {email: '', firstName: '', lastName: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.userService.createCandidate(result.email, result.firstName, result.lastName, this.auth.getAuthenticatedUser().getUsername());
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
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
