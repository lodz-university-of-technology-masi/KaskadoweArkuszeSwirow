import { Component, OnInit } from '@angular/core';  
import { Test } from '../models/Test.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css']
})
export class SolveTestComponent implements OnInit {
  test: Test;
  testForm;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
    ) { 
      this.getTestWithID();
      this.testForm = this.formBuilder.group({
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: ''
      });
    }

  ngOnInit() {
  }

  setTest(data: any): void {
    const tmp: Test = {id: data.id, questions: data.questions, title: data.title};
    this.test = tmp;
  }

  getTestWithID(): void {
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/943d9f36-37dc-49ca-b6ef-ed73f5e4b5ad`)
      .subscribe(data => {
        if (!('errorMessage' in data)){
          this.setTest(data);
          console.log(this.test)
        } else console.log("nie djela") 
      }

      );
  }

}
