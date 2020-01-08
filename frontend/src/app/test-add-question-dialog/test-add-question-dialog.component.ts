import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { Test } from '../models/Test.model'
import { HttpClient } from '@angular/common/http';
import { RefresherService } from '../refresher.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { DataSource } from '@angular/cdk/table';
import { Question } from '../models/Question.model';

@Component({
  selector: 'app-test-add-question-dialog',
  templateUrl: './test-add-question-dialog.component.html',
  styleUrls: ['./test-add-question-dialog.component.css']
})
export class TestAddQuestionDialogComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  questions: Question[] = [];

  constructor(
    public dialogRef: MatDialogRef<TestAddQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Test,
    private http: HttpClient,
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
        const question: Question = {id: data[i].id, question: data[i].question, answer: data[i].answer};
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
      ).subscribe(
      res => {
        //this.refresher.questionRefreshSubject$.next(1);
        this.addToList(res);
        console.log(res);
      }, err => console.log(err)
    );
  }

  onSubmit(customerData) {
    const title = customerData.title;
    const questions = [];
    console.log({'title': title, 'questions': questions});

    this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests',
      {'title': title, 'questions': questions}).subscribe(
      res => {
        //this.refresher.questionRefreshSubject$.next(1);
        console.log(res);
      }, err => console.log(err)
    );
    this.dialogRef.close();
  }

}