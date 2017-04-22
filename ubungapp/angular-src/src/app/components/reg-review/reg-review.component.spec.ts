import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegReviewComponent } from './reg-review.component';

describe('RegReviewComponent', () => {
  let component: RegReviewComponent;
  let fixture: ComponentFixture<RegReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
