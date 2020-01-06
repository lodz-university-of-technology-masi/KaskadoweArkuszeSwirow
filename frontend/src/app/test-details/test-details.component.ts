import { Test } from '../models/Test.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RefresherService } from '../refresher.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  test: Test;
  idOfTest: String;
  editing: Boolean = false;
  private routeSub: Subscription;
  private ticker: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private ref: ApplicationRef,
    private refresher: RefresherService) {
      this.getTestWithID();
      this.ticker = new Subscription();
    }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.idOfTest = params['id'];
      this.getTestWithID();
    });
  }

  getTestWithID(): void {
    this.http.get(`lambda z getem na test o danym id /${this.idOfTest}`)
      .subscribe(data => {
        console.log(data);
       this.test = {id: data[0].id, title: data[0].title, questions: JSON.parse(data[0].questions)};
        },
        () => {
          console.log('Failed to GET. Retrieving...');
          this.http.get(`lambda z getem na test o danym id /${this.idOfTest}`)
            .subscribe(data => {
              console.log(data);
              this.test = {id: data[0].id, title: data[0].title, questions: JSON.parse(data[0].questions)};
            }
            );
        }
      );
    }

    changeEditing() {
      this.editing = !this.editing;
    }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}