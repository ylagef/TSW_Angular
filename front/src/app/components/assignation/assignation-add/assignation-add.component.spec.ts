import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationAddComponent } from './assignation-add.component';

describe('AssignationAddComponent', () => {
  let component: AssignationAddComponent;
  let fixture: ComponentFixture<AssignationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
