import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { UsersManagementService } from 'src/app/shared/users-management.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription, Observable } from 'rxjs';


@Component({
  
  selector: 'app-new-tests',
  templateUrl: './show-tests-with-status.component.html',
  styleUrls: ['./show-tests-with-status.component.css']
})
export class ShowTestsWithStatus implements OnInit {
  
  status;
  dataSource = [];
  users = [];
  private routeSub: Subscription;

  constructor(private auth: AuthenticationService,
    private userService: UsersManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      }
      this.router.events.subscribe((evt) => {
          if (evt instanceof NavigationEnd) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
          }
      });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.status = params['status']});
    if (this.status !== 'new' && this.status !== 'solved' && this.status !== 'checked') {
      this.router.navigate(['**']);
      return;
    }
    this.getUsersTests();
  }

  getUsersTests() {
    if (this.auth.isLoggedIn()) {
      this.userService.getAllCandidates().subscribe((data) => {
          for (let it of data) {
            this.users.push({
              'id' : it.username, 
              'name' : it.attributes[2].value,
              'surname' : it.attributes[4].value, 
              'email' : it.attributes[6].value, 
              'role' : it.attributes[5].value
            });
          }
         console.log(this.users);
         this.getTests();
      });
    }
  }

  getTests() {
    this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform/status/new`, 
    {
      headers: new HttpHeaders({
        "Authorization" : this.auth.getAccessToken()
    })
    }).subscribe(
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
    {
      headers: new HttpHeaders().set("Authorization", this.auth.getAccessToken()),
    }
    ).subscribe(
    res => {
      console.log(res);
    }, err => console.log(err)
  );
  }
}
