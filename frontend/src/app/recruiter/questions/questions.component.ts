import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { Question } from '../../models/Question.model';
import { Answer } from '../../models/Answer.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RefresherService } from '../../refresher.service';
import { Subscription } from 'rxjs';
import { codes } from '../../codes';

let ELEMENT_DATA: Question[] = [];

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
        const question: Question = {id: data[i].id, question: data[i].question, isApproved: false, answer: data[i].answer, type: data[i].type};
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
    const dialogRef = this.dialog.open(AddQuestionDialog);

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
  styleUrls: ['questions.component.css']
})
export class AddQuestionDialog {
  noQuestion: boolean = false;
  noCorrectAnswer: boolean = false;
  noAnswer: boolean = false;
  
  selectedText: string = ""
  newChooseQuestionForm;
  newNumericalQuestionForm;
  newOpenQuestionForm;

  constructor(
    public dialogRef: MatDialogRef<AddQuestionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Question,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private refresher: RefresherService
  ) {
    this.newChooseQuestionForm = this.formBuilder.group({
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
    this.newNumericalQuestionForm = this.formBuilder.group({
      question: '',
      answer: ''
    });
    this.newOpenQuestionForm = this.formBuilder.group({
      question: ''
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  translate() {
    this.http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + codes.YANDEX_API_KEY + '&text=' + this.selectedText +'&lang=en&format=html')
      .subscribe(data => {
        let string = JSON.stringify(data);
        let text = JSON.parse(string);
        this.newChooseQuestionForm.question = text.text[0];
        console.log(this.newChooseQuestionForm.question)
      })
  }

  copyToTranslate() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    }
    this.selectedText = text;
  }

  onSubmit(customerData, type) {
    if (!customerData.question)
      this.noQuestion = true;
    else 
      this.noQuestion = false;
    if (type === 'W') {
      if (!customerData.answerA || !customerData.answerB || !customerData.answerC || !customerData.answerD)
        this.noAnswer = true;
      else
        this.noAnswer = false;
      if (!customerData.correctA && !customerData.correctB && !customerData.correctC && !customerData.correctD)
        this.noCorrectAnswer = true;
      else 
        this.noCorrectAnswer = false;
    } else if (type === 'L') {
      this.noCorrectAnswer = false;
      if (!customerData.answer)
        this.noAnswer = true;
      else
        this.noAnswer = false;
    } else if (type === 'O') {
      this.noAnswer = false;
      this.noCorrectAnswer = false;
    }
    if (this.noQuestion || this.noAnswer || this.noCorrectAnswer)
      return;

    let answers: Answer[] = [];
    if (type === 'W') {
      answers = [
        new Answer(customerData.answerA, customerData.correctA, null, null),
        new Answer(customerData.answerB, customerData.correctB, null, null),
        new Answer(customerData.answerC, customerData.correctC, null, null),
        new Answer(customerData.answerD, customerData.correctD, null, null)
      ];
    } else if (type === 'L') {
      answers = [
        new Answer(customerData.answer, false, null, null)
      ];
    } else if (type === 'O') {
      answers = [
        new Answer(null, false, null, null)
      ];
    }
    this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/question',
      {'question': customerData.question, 'answer': answers, 'type': type}).subscribe(
      res => {
        this.refresher.questionRefreshSubject$.next(1);
        console.log(res);
        this.dialogRef.close();
      }, err => console.log(err)
    );
  }

}