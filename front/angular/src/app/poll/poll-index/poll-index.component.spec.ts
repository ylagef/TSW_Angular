import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollIndexComponent } from './poll-index.component';

describe('PollIndexComponent', () => {
  let component: PollIndexComponent;
  let fixture: ComponentFixture<PollIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
