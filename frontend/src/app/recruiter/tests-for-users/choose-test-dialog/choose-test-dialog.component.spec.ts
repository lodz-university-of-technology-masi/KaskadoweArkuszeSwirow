import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTestDialogComponent } from './choose-test-dialog.component';

describe('ChooseTestDialogComponent', () => {
  let component: ChooseTestDialogComponent;
  let fixture: ComponentFixture<ChooseTestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseTestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
