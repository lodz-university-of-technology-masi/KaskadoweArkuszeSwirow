import { Test } from '../../../models/Test.model';
import { Question } from '../../../models/Question.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { TestAddQuestionDialogComponent } from '../test-add-question-dialog/test-add-question-dialog.component';
import { AuthenticationService } from 'src/app/shared/authentication.service';

let idOfTest: String;

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  test: Test;
  isEmpty: boolean = true;
  editing: boolean = false;
  pressedSaveButton: boolean = false;
  private routeSub: Subscription;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private http: HttpClient){
    }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      idOfTest = params['id'];
      this.getTestWithID(idOfTest);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getTestWithID(id: String): void {
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/${id}`,
      {
        headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
      })
      .subscribe(data => {
        if (!('errorMessage' in data)){
          console.log(data);
          this.setLocalTestToData(data);
        }else 
          this.getTestWithID(id);
      });
  }

  showAddQuestionDialog() {
    const dialogRef = this.dialog.open(TestAddQuestionDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.addToList(result);
    });
  }

  setLocalTestToData(data: any): void {
    this.test = {id: data.id, title: data.title, questions: data.questions};
    this.changeIsEmpty();
  }

  changeEditing() {
    this.editing = !this.editing;
  }

  changeIsEmpty(){
    if (this.test.questions.length > 0)
      this.isEmpty = false;
    else
      this.isEmpty = true;
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

  saveTest(): void {
    this.pressedSaveButton = true;
    if (this.test.questions.length === 0)
      this.deleteTest();
    else {
      for(let it of this.test.questions){
        delete it.isApproved;
      }
      this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests',
          {'id': this.test.id, 'title': this.test.title, 'questions': this.test.questions},
          {
            headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
          }).subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/recruiter/tests']);
          }, err => console.log(err)
        );
    }
  }

  deleteTest(): void {
    this.http.delete(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/${this.test.id}`,
    {
      headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
    })
    .subscribe(s => {
      console.log(s);
      this.router.navigate(['/recruiter/tests']);
    })
  }

}
