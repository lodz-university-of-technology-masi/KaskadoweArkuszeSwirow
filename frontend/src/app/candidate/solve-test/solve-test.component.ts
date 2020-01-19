import { Component, OnInit } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CandidateForm } from '../../models/CandidateForm.model';
import { Answer } from 'src/app/models/Answer.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css']
})
export class SolveTestComponent implements OnInit {
  test: CandidateForm;
  openAnswers = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthenticationService) { 
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

    for (let i = 0; i < this.test.testForm.questions.length; i++) {
      if (this.test.testForm.questions[i].type === 'O') {
        this.openAnswers.push('');
      }else
        this.openAnswers.push(null);
    }
  }

  changeAnswerIsSelected(answer: Answer): void {
    answer.isSelected = !answer.isSelected;
  }
  
  finishTest(): void {
    console.log(this.test);

    for (let i = 0; i < this.test.testForm.questions.length; i++) {
      delete this.test.testForm.questions[i].isApproved;
      if (this.test.testForm.questions[i].type === 'O') {
        this.test.testForm.questions[i].answer[0] = {
          candidateAnswer: this.openAnswers[i],
          content: null,
          isCorrect: null,
          isSelected: null
        }
      }
    }
    
    this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform', {
      'id': this.test.id, 'candidateId': this.test.candidateId, 'testStatus': 'solved', 'testResult': null, 'testForm': {'id': this.test.testForm.id, 'title': this.test.testForm.title, 'questions': this.test.testForm.questions}
    },
    {
      headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
    }
    ).subscribe( res => {
      console.log(res);
      this.router.navigate(['/candidate/my-tests']);
    }, err => console.log(err)
    );
    
  }

  getTestWithID(): void {
    let temp = window.location.href.split('/');
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform/` + 
        temp[temp.length - 1],
        {
          headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
        })
      .subscribe(data => {
        if (!('errorMessage' in data)){
          console.log(data);
          this.setTest(data);
        } else console.log("error with http get request"); 
      });
  }

}
