import { Component, OnInit } from '@angular/core';
import { CandidateForm } from 'src/app/models/CandidateForm.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-status.component.html',
  styleUrls: ['./test-status.component.css']
})
export class TestStatusComponent implements OnInit {
  test: CandidateForm;
  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient){
    }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.getTestWithID(params['id']);
    });
  }

  setLocalTestToData(data: any): void {
    this.test = {
      id: data.id, 
      candidateId: data.candidateId,
      testStatus: data.testStatus,
      testResult: data.testResult,
      testForm: data.testForm
    }
  }
  
  getTestWithID(id: String): void {
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform/${id}`)
    .subscribe(data => {
      if (!('errorMessage' in data)){
        console.log(data);
        this.setLocalTestToData(data);
      }else 
        this.getTestWithID(id);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
