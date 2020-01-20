import { Component, OnInit } from '@angular/core';
import { DisplayTest } from 'src/app/models/Test.model';
import { MatDialogRef } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-choose-test-dialog',
  templateUrl: './choose-test-dialog.component.html',
  styleUrls: ['./choose-test-dialog.component.css']
})
export class ChooseTestDialogComponent implements OnInit {o
  
  public translate: Boolean = false;
  tests: DisplayTest[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChooseTestDialogComponent>,
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.getTests();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addToList(data: Object): void {
    let i = 0;
    while (true) {
      if (data[i] !== undefined) {
        const test: DisplayTest = {id: data[i].id, title: data[i].title, questions: data[i].questions,
                                  selected: false};
        this.tests.push(test);
      } else {
        break;
      }
      i++;
    }
    // console.log(this.tests);
    //this.ref.tick();
  }

  getTests(): void {
    this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests',
    {
      headers: new HttpHeaders().set("Authorization", this.auth.getToken()),
    }
      ).subscribe(
      res => {
        this.addToList(res);
        // console.log(res);
      }, err => console.log(err)
    );
  }

  onSubmit() {
    const selectedTests: DisplayTest[] = [];
    for (let it of this.tests) {
      if (it.selected == true)
        selectedTests.push(it);
    }
    const ifTranslate = this.translate;
    this.dialogRef.close({selectedTests, ifTranslate});
  }

  changeTestSelected(test: DisplayTest) {
    test.selected = !test.selected;
  }


  changeTranslate() {
    this.translate = !this.translate;
  }


}
