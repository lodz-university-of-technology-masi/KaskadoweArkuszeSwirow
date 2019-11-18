import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface User {
  name: string;
  surname: string;
  age: number;
}

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'age'];
  dataSource = ELEMENT_DATA;


  constructor(public dialog: MatDialog, private http: HttpClient, private ref: ApplicationRef) {
    this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/dev/users').subscribe(data => {
      console.log(data)
      let i = 0;
      while(true) {
        if (data[i] !== undefined) {
          ELEMENT_DATA.push({name: data[i].firstName, surname: data[i].lastName, age: data[i].age});
        }
        else break;
        i++;
      }
      ref.tick();
    })
   }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  newUserForm;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,) {
      this.newUserForm = this.formBuilder.group({
        name: '',
        surname: '',
        age: ''
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(customerData) {
    ELEMENT_DATA.push({name: customerData.name, surname: customerData.surname, age: customerData.age})
  }

}
