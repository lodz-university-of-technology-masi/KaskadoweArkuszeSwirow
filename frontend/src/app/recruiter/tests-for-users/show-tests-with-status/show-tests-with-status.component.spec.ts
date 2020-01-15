import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowTestsWithStatus } from './show-tests-with-status.component';



describe('NewOrCheckedTestsComponent', () => {
  let component: ShowTestsWithStatus;
  let fixture: ComponentFixture<ShowTestsWithStatus>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTestsWithStatus ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTestsWithStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
