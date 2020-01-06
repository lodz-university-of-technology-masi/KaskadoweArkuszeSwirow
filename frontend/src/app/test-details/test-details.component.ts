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
      this.getTestWithID();
      this.ticker = new Subscription();
    }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      idOfTest = params['id'];
      this.getTestWithID();
    });
  }

  getTestWithID(): void {
    this.http.get(`lambda z getem na test o danym id /${idOfTest}`)
      .subscribe(data => {
        console.log(data);
       this.test = {id: data[0].id, title: data[0].title, questions: JSON.parse(data[0].questions)};
        },
        () => {
          console.log('Failed to GET. Retrieving...');
          this.http.get(`lambda z getem na test o danym id /${idOfTest}`)
            .subscribe(data => {
              console.log(data);
              this.test = {id: data[0].id, title: data[0].title, questions: JSON.parse(data[0].questions)};
            }
            );
        }
      );
  }

  changeEditing() {
    this.editing = !this.editing;
  }

  deleteQuestion(question: Question): void {
    this.http.post('lambda usuwajaca question z testu!',
    {'testId': idOfTest, 'questionId': question.id}).subscribe(
      res => {
        console.log(res);
        this.removeQuestionFromList(question);
      }, err => console.log(err)
    );
  }

  removeQuestionFromList(question: Question): void {
    let position = this.test.questions.indexOf(question);
    if (position >= 0)
      this.test.questions.splice(position, 1);
    console.log(this.test.questions);
    this.ref.tick();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionDialog, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}

@Component({
  selector: 'add-question-to-test-dialog',
  templateUrl: 'add-question-to-test-dialog.html',
})
export class AddQuestionToTestDialog {

  newQuestionForm;
  correctA = true;
  correctB = false;
  correctC = false;
  correctD = false;

  constructor(
    public dialogRef: MatDialogRef<AddQuestionToTestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Question,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private refresher: RefresherService
  ) {
    this.newQuestionForm = this.formBuilder.group({
      question: '',
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: ''
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(customerData) {
    const newQuestionId = uuidv4();
    const answers = [
      new Answer(customerData.answerA, this.correctA),
      new Answer(customerData.answerB, this.correctB),
      new Answer(customerData.answerC, this.correctC),
      new Answer(customerData.answerD, this.correctD)
    ];
    console.log({'id': newQuestionId, 'question': customerData.question, 'answer': JSON.stringify(answers)});

    this.http.post('lambda dodajaca pytanie do testu',
      {'testId' : idOfTest,'questionId': newQuestionId, 'question': customerData.question, 'answer': JSON.stringify(answers)}).subscribe(
      res => {
        this.refresher.questionRefreshSubject$.next(newQuestionId);
        console.log(res);
      }, err => console.log(err)
    );
  }

}