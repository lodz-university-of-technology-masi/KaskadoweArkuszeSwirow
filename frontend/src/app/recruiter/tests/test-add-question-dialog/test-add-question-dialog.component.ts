import { Component, OnInit, Inject } from '@angular/core';
import { Test } from '../../../models/Test.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DisplayQuestion } from '../../../models/Question.model';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-test-add-question-dialog',
  templateUrl: './test-add-question-dialog.component.html',
  styleUrls: ['./test-add-question-dialog.component.css']
})
export class TestAddQuestionDialogComponent implements OnInit {

  ngOnInit(): void {
  }

  
  questions: DisplayQuestion[] = [];

  constructor(
    public dialogRef: MatDialogRef<TestAddQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Test,
    private http: HttpClient,
    private auth: AuthenticationService
    //private refresher: RefresherService
  ) {
    this.getQuestions();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addToList(data: Object): void {
    let i = 0;
    while (true) {
      if (data[i] !== undefined) {
        const question: DisplayQuestion = {id: data[i].id, question: data[i].question, answer: data[i].answer, type: data[i].type,
                                  selected: false, isApproved: false};
        this.questions.push(question);
      } else {
        break;
      }
      i++;
    }
    console.log(this.questions);
    //this.ref.tick();
  }

  getQuestions(): void {
    this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/question',
      {
        headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
      }
      ).subscribe(
      res => {

        this.addToList(res);
        console.log(res);
      }, err => console.log(err)
    );
  }

  onSubmit() {
    const selectedQuestions: DisplayQuestion[] = [];
    for (let it of this.questions) {
      if (it.selected == true)
        selectedQuestions.push(it);
    }

    console.log("dialog:")
    console.log(selectedQuestions);
    this.dialogRef.close(selectedQuestions);

  }

  changeQuestionSelected(question: DisplayQuestion) {
    question.selected = !question.selected;
  }

}