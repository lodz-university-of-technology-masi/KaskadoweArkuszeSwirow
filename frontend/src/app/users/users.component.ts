import {Component, OnInit, Inject, ApplicationRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {RefresherService} from '../refresher.service';
import {User} from '../models/User.model';

let ELEMENT_DATA: User[] = [];
const uuidv4 = require('../../../node_modules/uuid');

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'age'];
  dataSource = ELEMENT_DATA;
  private ticker: Subscription;


  constructor(public dialog: MatDialog,
              private http: HttpClient,
              private ref: ApplicationRef,
              private refresher: RefresherService) {
    this.ticker = new Subscription();
    this.getUsers();
  }

  addToList(data: Object): void {
    let i = 0;
    while (true) {
      if (data[i] !== undefined) {
        const user: User = {id: data[i].id, name: data[i].firstName, surname: data[i].lastName, age: data[i].age};
        ELEMENT_DATA.push(user);
      } else {
        break;
      }
      i++;
    }
    this.ref.tick();
  }

  getUsers(...params: number[]): void {
    if (params.length === 0 || params[0] === 0 || params[0] === undefined) {
      this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/dev/users')
        .subscribe(data => {
          console.log(data)
            this.addToList(data);
          },
          () => {
            console.log('Failed to GET. Retrieving...');
            this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/dev/users')
              .subscribe(data => this.addToList(data),
                err => console.log(err)
              );
          }
        );
    } else {
      window.location.reload();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.ticker = this.refresher.usersRefreshSubject$.asObservable().subscribe(no => {
      this.getUsers(no);
    });
  }

  ngOnDestroy() {
    this.ticker.unsubscribe();
  }

}



@Component({
  selector: 'addUserDialog',
  templateUrl: 'addUserDialog.html',
})
export class AddUserDialog {

  newUserForm;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private refresher: RefresherService
  ) {
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
    const newUserId = uuidv4();
    this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/dev/users',
      {'id': newUserId, 'firstName': customerData.name, 'lastName': customerData.surname, 'age': customerData.age}).subscribe(
      res => {
        this.refresher.usersRefreshSubject$.next(newUserId);
        console.log(res);
      }, err => console.log(err)
    );
  }

}