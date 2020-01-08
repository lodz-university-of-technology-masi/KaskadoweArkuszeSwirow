import { Test } from '../models/Test.model';
import { Question, ChooseQuestion, OpenQuestion, NumericalQuestion, DisplayQuestion } from '../models/Question.model';
import { Answer } from '../models/Answer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RefresherService } from '../refresher.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, throwToolbarMixedModesError } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { TestAddQuestionDialogComponent } from '../test-add-question-dialog/test-add-question-dialog.component';

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

  showAddQuestionDialog() {
    const dialogRef = this.dialog.open(TestAddQuestionDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      for (let it of result) {
        this.addQuestion(it);
      }
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
      });
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

  addQuestion(question: Question) {
    this.http.post(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/edit/${idOfTest}`,
    {"id": question.id, "question": question.question, "answer": question.answer}).subscribe(
      res => {
        console.log(res);
        this.addQuestionToList(question);
      }, err => console.log(err)
    );
  }

  addQuestionToList(question: Question): void {
    this.test.questions.push(question);
    this.ref.tick();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.ticker.unsubscribe();
  }
}
