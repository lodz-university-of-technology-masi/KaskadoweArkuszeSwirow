import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { Test } from '../models/Test.model'
import { HttpClient } from '@angular/common/http';
import { RefresherService } from '../refresher.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { AddQuestionDialog } from '../questions/questions.component';
import { DataSource } from '@angular/cdk/table';

let ELEMENT_DATA: Test[] = [];

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  private ticker: Subscription;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private ref: ApplicationRef,
    private refresher: RefresherService) {
      this.getTests();
      this.ticker = new Subscription();
    }

  addToList(data: Object): void {
    let i = 0;
    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
    while (true) {
      if (data[i] !== undefined) {
        const test: Test = {id: data[i].id, title: data[i].title, questions: data[i].questions};
        ELEMENT_DATA.push(test);
      } else {
        break;
      }
      i++;
    }
    this.ref.tick();
  }
  
  removeFromList(test: Test): void {
    let position = ELEMENT_DATA.indexOf(test);
    if (position >= 0)
      ELEMENT_DATA.splice(position, 1);
    this.ref.tick();
  }

  getTests(...params: number[]): void {
    if (params.length === 0 || params[0] === 0 || params[0] === undefined) {
      this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests')
        .subscribe(data => {
          console.log(data)
            this.addToList(data);
          }
        );
    } else {
      window.location.reload();
    }
  }

  deleteTest(test: Test): void {
    this.http.delete(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/${test.id}`)
    .subscribe(s => {
      this.removeFromList(test);
    })
  }

  ngOnInit() {
    this.ticker = this.refresher.questionRefreshSubject$.asObservable().subscribe(no => {
      this.getTests(no);
    });
  }

  createTest() {
    const dialogRef = this.dialog.open(CreateNewTestDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.ticker.unsubscribe();
  }
}

const uuidv4 = require('../../../node_modules/uuid');

@Component({
  selector: 'create-new-test-dialog',
  templateUrl: 'create-new-test-dialog.html',
})
export class CreateNewTestDialog {

  newTestForm;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<CreateNewTestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Test,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private refresher: RefresherService
  ) {
    this.newTestForm = this.formBuilder.group({
      title: '',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(customerData) {
    const title = customerData.title;
    const questions = [];
    console.log({'title': title, 'questions': questions});

    this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests',
      {'title': title, 'questions': questions}).subscribe(
      res => {
        this.refresher.questionRefreshSubject$.next(1);
        console.log(res);
      }, err => console.log(err)
    );
    this.dialogRef.close();
    // this.router.navigate(['/test-details', id]);
  }

}