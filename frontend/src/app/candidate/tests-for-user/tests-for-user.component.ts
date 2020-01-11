import { Component, OnInit, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Test } from '../../models/Test.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { RefresherService } from '../../refresher.service';

let ELEMENT_DATA: Test[] = [];

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
    private refresher: RefresherService) { 
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
        const test: Test = {id: data[i].id, title: data[i].title, questions: data[i].questions};
        ELEMENT_DATA.push(test);
      } else {
        break;
      }
      i++;
    }
    this.ref.tick();
  }

  getTests(...params: number[]): void {
    if (params.length === 0 || params[0] === 0 || params[0] === undefined) {
      this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests')
        .subscribe(data => {
          console.log(data)
            this.addToList(data);
          }
        );
    } else {
      window.location.reload();
    }
  }

}
