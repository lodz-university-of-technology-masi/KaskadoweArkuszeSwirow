import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsForUserComponent } from './tests-for-user.component';

describe('TestsForUserComponent', () => {
  let component: TestsForUserComponent;
  let fixture: ComponentFixture<TestsForUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsForUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
