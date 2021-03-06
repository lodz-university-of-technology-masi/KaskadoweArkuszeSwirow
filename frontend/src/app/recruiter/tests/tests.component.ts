import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Test } from '../../models/Test.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RefresherService } from '../../refresher.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { codes } from '../../../app/codes';

let ELEMENT_DATA: Test[] = [];

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  private ticker: Subscription;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private ref: ApplicationRef,
    private auth: AuthenticationService,
    private refresher: RefresherService) {
      this.getTests();
      this.ticker = new Subscription();
    }

  addToList(data: Object): void {
    let i = 0;
    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
    while (true) {
      if (data[i] !== undefined) {
        const test: Test = {id: data[i].id, title: data[i].title, questions: data[i].questions};
        if(i==3) this.translate(test);
        ELEMENT_DATA.push(test);
      } else {
        break;
      }
      i++;
    }
    this.ref.tick();
  }
  
  removeFromList(test: Test): void {
    let position = ELEMENT_DATA.indexOf(test);
    if (position >= 0)
      ELEMENT_DATA.splice(position, 1);
    this.ref.tick();
  }
 
  getTests(...params: number[]): void {
    if (params.length === 0 || params[0] === 0 || params[0] === undefined) {
      this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests',
      {
        headers: new HttpHeaders({'Authorization' : this.auth.getToken()}),
      })
        .subscribe(data => {
          console.log(data)
            this.addToList(data);
          }
        );
    } else {
      window.location.reload();
    }
  }

  translate(test: any) {
    let textToTranslate: String = '';
    for(let question of test.questions) {
      textToTranslate += question.question + '|';
      if (question.type == "O") {
        textToTranslate += "||||";
      } else if (question.type == "L") {
        textToTranslate += question.answer[0].content + '||||';
      } else if (question.type == "W") {
        for(let answer of question.answer) {
          textToTranslate += answer.content + '|';
        }
      }
    }
    textToTranslate += test.title;
    this.http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + codes.YANDEX_API_KEY + '&text=' + textToTranslate +'&lang=en&format=html')
      .subscribe(data => {
        let string = JSON.stringify(data);
        let text = JSON.parse(string);
        console.log(text.text[0].split('|'))
      })
  }

  deleteTest(test: Test): void {
    this.http.delete(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/${test.id}`,
    {
      headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
    })
    .subscribe(s => {
      this.removeFromList(test);
    })
  }

  ngOnInit() {
    this.ticker = this.refresher.questionRefreshSubject$.asObservable().subscribe(no => {
      this.getTests(no);
    });
  }

  ngOnDestroy() {
    this.ticker.unsubscribe();
  }
}