import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Test } from '../models/Test.model';
import { Router } from '@angular/router';
import { Question } from '../models/Question.model';
import { MatDialog } from '@angular/material';
import { TestAddQuestionDialogComponent } from '../test-add-question-dialog/test-add-question-dialog.component';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.css']
})
export class TestCreateComponent implements OnInit {
  test: Test = {'id': null, 'title': null, 'questions' : []};
  isEmpty: boolean = true;
  numberOfRandomQuestions: number = 1;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addToList(data: Object): void {
    let i = 0;
    while (true) {
      if (data[i] !== undefined) {
        const tmp: Question = {id: data[i].id, question: data[i].question, answer: data[i].answer};
        this.test.questions.push(tmp);
      } else {
        break;
      }
      i++;
    }
    this.setIsEmpty();
  }

  deleteFromList(question: Question): void {
    let position = this.test.questions.indexOf(question);
    if (position >= 0)
      this.test.questions.splice(position, 1);
    this.setIsEmpty();
  }

  setIsEmpty(){
    if (this.test.questions.length > 0)
      this.isEmpty = false;
    else
      this.isEmpty = true;
  }

  generateRandomQuestions(number: number=2): void {
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/question/random/${number}`)
    .subscribe(
        res => {
          console.log(res);
          this.addToList(res);
        }, err => console.log(err)
      );
  }

  saveTest(): void {
    this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests',
        {'title': this.test.title, 'questions': this.test.questions}).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/tests']);
        }, err => console.log(err)
      );
  }

  showAddQuestionDialog() {
  const dialogRef = this.dialog.open(TestAddQuestionDialogComponent);
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    this.addToList(result);
  });
  }
}
