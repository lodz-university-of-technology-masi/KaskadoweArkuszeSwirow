import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAddQuestionDialogComponent } from './test-add-question-dialog.component';

describe('TestAddQuestionDialogComponent', () => {
  let component: TestAddQuestionDialogComponent;
  let fixture: ComponentFixture<TestAddQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAddQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAddQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
