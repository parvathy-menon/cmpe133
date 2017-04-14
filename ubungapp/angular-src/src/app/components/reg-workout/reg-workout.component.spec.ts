import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegWorkoutComponent } from './reg-workout.component';

describe('RegWorkoutComponent', () => {
  let component: RegWorkoutComponent;
  let fixture: ComponentFixture<RegWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
