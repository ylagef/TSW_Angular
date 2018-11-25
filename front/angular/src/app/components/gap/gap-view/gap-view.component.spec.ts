import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GapViewComponent } from './gap-view.component';

describe('GapViewComponent', () => {
  let component: GapViewComponent;
  let fixture: ComponentFixture<GapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
