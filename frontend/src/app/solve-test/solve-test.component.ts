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
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests/f460124e-846a-41c0-8add-420b9877dd82`)
      .subscribe(data => {
        if (!('errorMessage' in data)){
          this.setTest(data);
          console.log(this.test)
        } else console.log("nie djela") 
      }

      );
  }

}
