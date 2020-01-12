import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsForUsersComponent } from './tests-for-users.component';

describe('TestsForUsersComponent', () => {
  let component: TestsForUsersComponent;
  let fixture: ComponentFixture<TestsForUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsForUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsForUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
