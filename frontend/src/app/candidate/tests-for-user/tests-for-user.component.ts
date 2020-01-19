import { Component, OnInit, ApplicationRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { RefresherService } from '../../refresher.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Question } from 'src/app/models/Question.model';

export class TestForUser {
  constructor(id: string, candidateId: string, testStatus: string, testResult: string, testForm: TestForm) {
    this.id = id;
    this.candidateId = candidateId;
    this.testStatus = testStatus;
    this.testResult = testResult;
    this.testForm = testForm;
  }
  id: string;
  candidateId: string;
  testStatus: string;
  testResult: string;
  testForm: TestForm;
}

export class TestForm {
  constructor (id: string, language: string, title: string, questions: Question[]) {
    this.id = id;
    this.language = language;
    this.title = title;
    this.questions = questions;
  }
  id: string;
  language: string;
  title: string;
  questions: Question[];
}

let ELEMENT_DATA: TestForUser[] = [];

@Component({
  selector: 'app-tests-for-user',
  templateUrl: './tests-for-user.component.html',
  styleUrls: ['./tests-for-user.component.css']
})
export class TestsForUserComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  private ticker: Subscription;

  constructor(
    private ref: ApplicationRef,
    private http: HttpClient,
    private refresher: RefresherService,
    private auth: AuthenticationService
    ) { 
      this.getTests();
      this.ticker = new Subscription();
    }

  ngOnInit() {
    this.ticker = this.refresher.questionRefreshSubject$.asObservable().subscribe(no => {
    this.getTests(no);
  });
  }

  addToList(data: Object): void {
    let i = 0;
    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
    while (true) {
      if (data[i] !== undefined) {
        // const questions: Question[] = data[i].testForm.questions;
        // const testForm: TestForm = {id: data[i].testForm.id, language: data[i].testForm.language, 
        //                             title: data[i].testForm.title, questions: questions}
        const test: TestForUser = {id: data[i].id, candidateId: data[i].candidateId, testStatus: data[i].testStatus, 
                                    testResult: data[i].testResult, testForm: data[i].testForm};
        ELEMENT_DATA.push(test);
      } else {
        break;
      }
      i++;
    }
    console.log(ELEMENT_DATA);
    this.ref.tick();
  }

  getTests(...params: number[]): void {
    if (params.length === 0 || params[0] === 0 || params[0] === undefined) {
      this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform/candidate/' +
                      this.auth.getAuthenticatedUser().getUsername() + '?status=any',
                      {
                        headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
                      })
        .subscribe(data => {
          // console.log(data)
            this.addToList(data);
          }
        );
    } else {
      window.location.reload();
    }
  }

}
