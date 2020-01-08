import { Component, OnInit } from '@angular/core';
import { Test } from '../models/Test.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css']
})
export class SolveTestComponent implements OnInit {
  test: Test;

  constructor(
    private http: HttpClient) { 
      this.getTestWithID();
    }

  ngOnInit() {
  }

  setTest(data: any): void {
    const tmp: Test = {id: data.id, questions: data.questions, title: data.title};
    this.test = tmp;
  }

  getTestWithID(): void {
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/9b857c41-892c-4217-8baf-aea3e53f574c`)
      .subscribe(data => {
        if (!('errorMessage' in data)){
          this.setTest(data);
          console.log(this.test)
        } else console.log("nie djela") 
      }

      );
  }

}
