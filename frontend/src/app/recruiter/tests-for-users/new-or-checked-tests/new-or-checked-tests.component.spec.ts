import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewOrCheckedTestsComponent } from './new-or-checked-tests.component';



describe('NewOrCheckedTestsComponent', () => {
  let component: NewOrCheckedTestsComponent;
  let fixture: ComponentFixture<NewOrCheckedTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrCheckedTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrCheckedTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
