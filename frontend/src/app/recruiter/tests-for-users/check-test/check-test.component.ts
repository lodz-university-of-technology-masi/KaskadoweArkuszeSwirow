import { Component, OnInit } from '@angular/core';  
import { HttpClient } from '@angular/common/http';
import { CandidateForm } from '../../../models/CandidateForm.model';
import { Answer } from 'src/app/models/Answer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-test',
  templateUrl: './check-test.component.html',
  styleUrls: ['./check-test.component.css']
})
export class CheckTestComponent implements OnInit {
  test: CandidateForm;

  constructor(
    private http: HttpClient,
    private router: Router) { 
      this.getTestWithID();
    }

  ngOnInit() {
  }

  setTest(data: any): void {
    const tmp: CandidateForm = {
      id: data[0].id, 
      candidateId: data[0].candidateId,
      testStatus: data[0].testStatus,
      testResult: data[0].testResult,
      testForm: data[0].testForm};
    this.test = tmp;
  }

  changeAnswerIsSelected(answer: Answer): void {
    answer.isSelected = !answer.isSelected;
  }

  finishTest(): void {
    this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform', {
      'id': this.test.id, 'candidateId': this.test.candidateId, 'testStatus': 'checked', 'testResult': 'passed', 'testForm': {'id': this.test.testForm.id, 'title': this.test.testForm.title, 'questions': this.test.testForm.questions}
    }).subscribe( res => {
      console.log(res);
      this.router.navigate(['/candidate/my-tests']);
    }, err => console.log(err)
    );
    
  }

  getTestWithID(): void {
    console.log(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform/` + 
    window.location.href.split('/')[window.location.href.split('/').length-1]);
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform/` + 
                    window.location.href.split('/')[window.location.href.split('/').length-1])
      .subscribe(data => {
        if (!('errorMessage' in data)){
          console.log(data);
          this.setTest(data);
        } else console.log("error with http get request"); 
      });
  }

}