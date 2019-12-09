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
    while (true) {
      if (data[i] !== undefined) {
        const question: Question = {id: data[i].id, question: data[i].question, answer: JSON.parse(data[i].answer)};
        ELEMENT_DATA.push(question);
      } else {
        break;
      }
      i++;
    }
    this.ref.tick();
  }

  getQuestions(...params: number[]): void {
    if (params.length === 0 || params[0] === 0 || params[0] === undefined) {
      this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/dev/question')
        .subscribe(data => {
          console.log(data)
            this.addToList(data);
          },
          () => {
            console.log('Failed to GET. Retrieving...');
            this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/dev/question')
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
    const dialogRef = this.dialog.open(AddQuestionDialog, {
      width: '250px'
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
      new Answer(customerData.answerA, true),
      new Answer(customerData.answerB, false),
      new Answer(customerData.answerC, false),
      new Answer(customerData.answerD, false)
    ];
    console.log({'id': newQuestionId, 'question': customerData.question, 'answer': JSON.stringify(answers)})
    this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/dev/question',
      {'id': newQuestionId, 'question': customerData.question, 'answer': JSON.stringify(answers)}).subscribe(
      res => {
        this.refresher.questionRefreshSubject$.next(newQuestionId);
        console.log(res);
      }, err => console.log(err)
    );
  }

}