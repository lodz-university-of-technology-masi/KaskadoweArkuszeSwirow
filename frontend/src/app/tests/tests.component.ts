import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { Test } from '../models/Test.model'
import { HttpClient } from '@angular/common/http';
import { RefresherService } from '../refresher.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
    private router: Router,
    private http: HttpClient,
    private ref: ApplicationRef,
    private refresher: RefresherService) {
      this.getTests(0);
      this.ticker = new Subscription();
    }

  addToList(data: Object): void {
    let i = 0;
    while (true) {
      if (data[i] !== undefined) {
        const test: Test = {id: data[i].id, title: data[i].title, questions: JSON.parse(data[i].questions)};
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
  }

  getTests(...params: number[]): void {
    if (params.length === 0 || params[0] === 0 || params[0] === undefined) {
      this.http.get('lambda zwracajaca wszystkie testy <--- tu')
        .subscribe(data => {
          console.log(data)
            this.addToList(data);
          },
          () => {
            console.log('Failed to GET. Retrieving...');
            this.http.get('lambda zwracajaca wszystkie testy <--- tu')
              .subscribe(data => this.addToList(data),
                err => console.log(err)
              );
          }
        );
    } else {
      window.location.reload();
    }
  }

  deleteTest(test: Test): void {
    this.http.delete(`lambda usuwajaca test z podanym id ! /${test.id}`)
    .subscribe(s => {
      console.log(s);
      this.removeFromList(test);
    })
  }

  goToTestCreate(): void {
    this.router.navigate(['/test-create', {}]);
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
