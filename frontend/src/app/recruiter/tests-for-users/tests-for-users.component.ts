import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { UsersManagementService } from 'src/app/shared/users-management.service';
import { User } from 'src/app/models/User.model';
import { MatDialog } from '@angular/material';
import { ChooseTestDialogComponent } from './choose-test-dialog/choose-test-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { codes } from '../../../app/codes';

@Component({
  selector: 'app-tests-for-users',
  templateUrl: './tests-for-users.component.html',
  styleUrls: ['./tests-for-users.component.css']
})
export class TestsForUsersComponent implements OnInit {

  users: User[] = [];

  constructor(private auth: AuthenticationService,
    private dialog: MatDialog,
    private userService: UsersManagementService,
    private http: HttpClient) {
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      console.log(this.userService.getAllCandidates());
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
        }
      );
    }
  }
  assignTest(user){ 
    const dialogRef = this.dialog.open(ChooseTestDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        for (let it of result) {

          for (let x of it.questions) {
            delete x.isApproved;
          }

          this.translate(it);
          this.http.post('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/candidateform', {
           'candidateId': user.id, 'testStatus': 'new', 'testResult': null, 'testForm': {'id': it.id, 'title': it.title, 'questions': it.questions}
          },
          {
            headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
          }).subscribe( res => {
            console.log(res);
          }, err => console.log(err)
         );}
      }
    });
  }

  translate(test: any) {
    let textToTranslate: String = '';
    textToTranslate = test.title + ';';
    for(let question of test.questions) {
      textToTranslate += question.question + ';';
      if (question.type == "O") {
        textToTranslate += ";;;;";
      } else if (question.type == "L") {
        textToTranslate += question.answer[0].content + ';;;';
      } else if (question.type == "W") {
        for(let answer of question.answer) {
          textToTranslate += answer.content + ';';
        }
      }
    }
    // console.log(textToTranslate);
    this.http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + codes.YANDEX_API_KEY + '&text=' + textToTranslate +'&lang=en&format=html')
      .subscribe(data => {
        console.log(data)
      })
  }

}
