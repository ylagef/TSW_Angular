import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationEditComponent } from './assignation-edit.component';

describe('AssignationEditComponent', () => {
  let component: AssignationEditComponent;
  let fixture: ComponentFixture<AssignationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
