import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { UsersManagementService } from 'src/app/shared/users-management.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-tests',
  templateUrl: './new-or-checked-tests.component.html',
  styleUrls: ['./new-or-checked-tests.component.css']
})
export class NewOrCheckedTestsComponent implements OnInit {

  status; 
  dataSource = [];
  users = [];
  private routeSub: Subscription;

  constructor(private auth: AuthenticationService,
    private userService: UsersManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.status = params['status']});
    this.getUsersTest();
  }

  getUsersTest() {
    if (this.auth.isLoggedIn()) {
      console.log(this.auth.getAuthenticatedUser().getUsername());
      this.userService.getAllCandidates(this.auth.getAuthenticatedUser().getUsername()).subscribe((data) => {
          for (let it of data) {
            this.users.push({
              'id' : it.Username, 
              'name' : it.Attributes[0].Value,
              'surname' : it.Attributes[3].Value, 
              'email' : it.Attributes[4].Value, 
              'role' : it.Attributes[1].Value
            });
         }
        }
      );
    }
    console.log(this.users);
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform/status/${this.status}`,
    ).subscribe(
    res => {
      console.log(res);
      if(res) {
         this.addToList(res);
     }
    }, err => console.log(err)
  );
  
  }

  addToList(data): void {
    for(let it of data) {
      let tmp = it;
      for (let user of this.users) {
        if (user.id === it.candidateId) {
          tmp.name = user.name;
          tmp.surname = user.surname;
          tmp.email = user.email;
          tmp.role = user.role;
          break;
        }
      }
      this.dataSource.push(tmp);
    }
    console.log(this.dataSource);
  }
  
  removeFromList(test): void {
    let position = this.dataSource.indexOf(test);
    if (position >= 0)
    this.dataSource.splice(position, 1);
    this.deleteTest(test.id)
  }

  deleteTest(id: String): void {
    this.http.delete(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform/${id}`,
    ).subscribe(
    res => {
      console.log(res);
    }, err => console.log(err)
  );
  }
}
