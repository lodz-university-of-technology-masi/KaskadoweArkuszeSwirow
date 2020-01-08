import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import {Question, ChooseQuestion, OpenQuestion, NumericalQuestion} from '../models/Question.model';
import { Answer } from '../models/Answer.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { RefresherService } from '../refresher.service';
import { Subscription } from 'rxjs';

let ELEMENT_DATA: Question[] = [];

const uuidv4 = require('../../../node_modules/uuid');

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  private ticker: Subscription;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private ref: ApplicationRef,
    private refresher: RefresherService) {
      this.getQuestions(0);
      this.ticker = new Subscription();
    }

  addToList(data: Object): void {
    let i = 0;
    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
    while (true) {
      if (data[i] !== undefined) {
        const question: Question = {id: data[i].id, question: data[i].question, answer: data[i].answer};
        ELEMENT_DATA.push(question);
      } else {
        break;
      }
      i++;
    }
    console.log(ELEMENT_DATA);
    this.ref.tick();
  }

  deleteQuestion(question: Question) {
    this.http.delete(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/question/${question.id}`)
        .subscribe(data => {
          console.log(data)
            this.removeFromList(question);
          }
        );
  }

  removeFromList(question: Question): void {
    let position = ELEMENT_DATA.indexOf(question);
    if (position >= 0)
      ELEMENT_DATA.splice(position, 1);
    this.ref.tick();
  }

  getQuestions(...params: number[]): void {
    if (params.length === 0 || params[0] === 0 || params[0] === undefined) {
      this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/question')
        .subscribe(data => {
          console.log(data)
            this.addToList(data);
          }
        );
    } else {
      window.location.reload();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.ticker = this.refresher.questionRefreshSubject$.asObservable().subscribe(no => {
      this.getQuestions(no);
    });
  }

  ngOnDestroy() {
    this.ticker.unsubscribe();
  }
}



@Component({
  selector: 'addQuestionDialog',
  templateUrl: 'addQuestionDialog.html',
})
export class AddQuestionDialog {

  newQuestionForm;

  constructor(
    public dialogRef: MatDialogRef<AddQuestionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Question,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private refresher: RefresherService
  ) {
    this.newQuestionForm = this.formBuilder.group({
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
    const answers = [
      new Answer(customerData.answerA, customerData.correctA),
      new Answer(customerData.answerB, customerData.correctB),
      new Answer(customerData.answerC, customerData.correctC),
      new Answer(customerData.answerD, customerData.correctD)
    ];
    this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/question',
      {'question': customerData.question, 'answer': answers}).subscribe(
      res => {
        this.refresher.questionRefreshSubject$.next(1);
        console.log(res);
        this.dialogRef.close();
      }, err => console.log(err)
    );
  }

}