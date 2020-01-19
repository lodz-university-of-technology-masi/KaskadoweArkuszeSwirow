import { Component, OnInit } from '@angular/core';  
import { HttpClient } from '@angular/common/http';
import { CandidateForm } from '../../../models/CandidateForm.model';
import { Answer } from 'src/app/models/Answer.model';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/Question.model';

@Component({
  selector: 'app-check-test',
  templateUrl: './check-test.component.html',
  styleUrls: ['./check-test.component.css']
})
export class CheckTestComponent implements OnInit {
  test: CandidateForm;
  checking: boolean;

  constructor(
    private http: HttpClient,
    private router: Router) { 
      let page = window.location.href.split('/');
      if (page[page.length - 2] === 'check-test') 
        this.checking = true;
      else
        this.checking = false;
      this.getTestWithID();
    }

  ngOnInit() {
  }

  setTest(data: any): void {
    const tmp: CandidateForm = {
      id: data.id, 
      candidateId: data.candidateId,
      testStatus: data.testStatus,
      testResult: data.testResult,
      testForm: data.testForm};
    this.test = tmp;
    for (let it of this.test.testForm.questions) {
      if (it.type === 'L' && it.answer[0].content === it.answer[0].candidateAnswer){
        it.isApproved = true;
      }else if (it.type === 'W') {
        let temp: boolean = true;
        for (let answer of it.answer) {
            temp = temp && (answer.isCorrect === answer.isSelected);
        }
        it.isApproved = temp;
      }
      else
        it.isApproved = false;
    }
  }

  changeAnswerIsSelected(answer: Answer): void {
    answer.isSelected = !answer.isSelected;
  }

  changeQuestionIsApproved(question: Question): void {
    question.isApproved = !question.isApproved;
  }

  calculateResult(): String {
    let result: number = 0;
    let short: String = 'failed';
    for (let it of this.test.testForm.questions) {
      if (it.isApproved)
        result++;
    }
    if ((result / this.test.testForm.questions.length) > 0.5)
      short = 'passed'
    return `${short};${result}/${this.test.testForm.questions.length}`;
  }

  finishTest(): void {
    if (this.checking) {
      console.log(this.test);
      let result = this.calculateResult();
      this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform', {
        'id': this.test.id, 'candidateId': this.test.candidateId, 'testStatus': 'checked', 'testResult': result, 'testForm': {'id': this.test.testForm.id, 'title': this.test.testForm.title, 'questions': this.test.testForm.questions}
      }).subscribe( res => {
        console.log(res);
        this.router.navigate(['/recuiter/tests-for-users/solved']);
      }, err => console.log(err)
      );
    }else console.log('Error. Cannot finish the test. Read-only mode');
  }

  getTestWithID(): void {
    let temp = window.location.href.split('/')
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform/` + 
          temp[temp.length - 1])
      .subscribe(data => {
        if (!('errorMessage' in data)){
          console.log(data);
          this.setTest(data);
        } else console.log("error with http get request"); 
      });
  }

}