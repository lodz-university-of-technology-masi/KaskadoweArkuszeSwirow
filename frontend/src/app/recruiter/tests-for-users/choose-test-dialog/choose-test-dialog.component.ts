import { Component, OnInit } from '@angular/core';
import { Test, DisplayTest } from 'src/app/models/Test.model';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-choose-test-dialog',
  templateUrl: './choose-test-dialog.component.html',
  styleUrls: ['./choose-test-dialog.component.css']
})
export class ChooseTestDialogComponent implements OnInit {

  tests: DisplayTest[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChooseTestDialogComponent>,
    private http: HttpClient,
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
    console.log(this.tests);
    //this.ref.tick();
  }

  getTests(): void {
    this.http.get('https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/tests',
      ).subscribe(
      res => {
        this.addToList(res);
        console.log(res);
      }, err => console.log(err)
    );
  }

  onSubmit() {
    const selectedTests: DisplayTest[] = [];
    for (let it of this.tests) {
      if (it.selected == true)
        selectedTests.push(it);
    }
    this.dialogRef.close(selectedTests);
  }

  changeTestSelected(test: DisplayTest) {
    test.selected = !test.selected;
  }


}
