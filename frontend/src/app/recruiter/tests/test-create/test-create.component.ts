import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Test } from '../../../models/Test.model';
import { Router } from '@angular/router';
import { Question } from '../../../models/Question.model';
import { MatDialog } from '@angular/material';
import { TestAddQuestionDialogComponent } from '../test-add-question-dialog/test-add-question-dialog.component';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.css']
})
export class TestCreateComponent implements OnInit {
  test: Test = {'id': null, 'title': null, 'questions' : []};
  isEmpty: boolean = true;
  numberOfRandomQuestions: number = 1;
  pressedSaveButton: boolean = false;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

  addToList(data: Object): void {
    let i = 0;
    while (true) {
      if (data[i] !== undefined) {
        const tmp: Question = {id: data[i].id, question: data[i].question, answer: data[i].answer, type: data[i].type, isApproved: false};
        this.test.questions.push(tmp);
      } else {
        break;
      }
      i++;
    }
    this.changeIsEmpty();
  }

  deleteFromList(question: Question): void {
    let position = this.test.questions.indexOf(question);
    if (position >= 0)
      this.test.questions.splice(position, 1);
    this.changeIsEmpty();
  }

  changeIsEmpty(){
    if (this.test.questions.length > 0)
      this.isEmpty = false;
    else
      this.isEmpty = true;
  }

  generateRandomQuestions(number: number=2): void {
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/question/random/${number}`,
    {
      headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
    })
    .subscribe(
        res => {
          console.log(res);
          this.addToList(res);
        }, err => console.log(err)
      );
  }

  saveTest(): void {
    this.pressedSaveButton = true;
    if (!this.test.title || this.test.questions.length === 0)
      return;
    this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests',
        {'title': this.test.title, 'questions': this.test.questions},
        {
          headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
        }).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/recruiter/tests']);
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
