import { Test } from '../models/Test.model';
import { Question, ChooseQuestion, OpenQuestion, NumericalQuestion } from '../models/Question.model';
import { Answer } from '../models/Answer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RefresherService } from '../refresher.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, throwToolbarMixedModesError } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { AddQuestionDialog } from '../questions/questions.component';

const uuidv4 = require('../../../node_modules/uuid');
let idOfTest: String;

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  test: Test;
  isQuestionsEmpty: Boolean = true;
  editing: Boolean = false;
  private routeSub: Subscription;
  private ticker: Subscription;
  
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private ref: ApplicationRef,
    private refresher: RefresherService) {
      this.getTestWithID(idOfTest);
      this.ticker = new Subscription();
    }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      idOfTest = params['id'];
      this.getTestWithID(idOfTest);
    });
    this.ticker = this.refresher.questionRefreshSubject$.asObservable().subscribe(no => {
      this.getTestWithID(idOfTest);
    });
  }

  getTestWithID(id: String): void {
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/${id}`)
      .subscribe(data => {
        if (!('errorMessage' in data)){
          console.log(data);
          this.setLocalTestToData(data);
        }else 
          this.getTestWithID(id);
      }

      );
  }


  setLocalTestToData(data: any): void {
    const tmp: Test = {id: data.id, title: data.title, questions: data.questions};
    this.test = tmp;
    if (this.test.questions.length > 0)
      this.isQuestionsEmpty = false;
    else
      this.isQuestionsEmpty = true;
    this.ref.tick();
  }

  changeEditing() {
    this.editing = !this.editing;
  }

  deleteQuestion(question: Question): void {
    // this.http.delete(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/${idOfTest}`,
    // {"id": "question.id" }).subscribe(
    //   res => {
    //     console.log(res);
    //     this.removeQuestionFromList(question);
    //   }, err => console.log(err)
    // );
  }

  removeQuestionFromList(question: Question): void {
    let position = this.test.questions.indexOf(question);
    if (position >= 0)
    this.test.questions.splice(position, 1);
    console.log(this.test.questions);
    this.ref.tick();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionToTestDialog, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.ticker.unsubscribe();
  }
}

@Component({
  selector: 'add-question-to-test-dialog',
  templateUrl: 'add-question-to-test-dialog.html',
})
export class AddQuestionToTestDialog {

  newQuestionToTestForm;

  constructor(
    public dialogRef: MatDialogRef<AddQuestionToTestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Question,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private refresher: RefresherService
  ) {
    this.newQuestionToTestForm = this.formBuilder.group({
      question: '',
      answerA: '',
      correctA: '',
      answerB: '',
      correctB: '',
      answerC: '',
      correctC: '',
      answerD: '',
      correctD: ''
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(customerData) {
    const newQuestionId = uuidv4();
    const answers = [
      new Answer(customerData.answerA, customerData.correctA),
      new Answer(customerData.answerB, customerData.correctB),
      new Answer(customerData.answerC, customerData.correctC),
      new Answer(customerData.answerD, customerData.correctD)
    ];

    this.http.post(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/edit/${idOfTest}`,
      {"id": newQuestionId, "question": customerData.question, "answer": answers
    }).subscribe(
      res => {
        this.refresher.questionRefreshSubject$.next(1);
        console.log(res);
        this.dialogRef.close();
      }, err => console.log(err)
    );
  }

}