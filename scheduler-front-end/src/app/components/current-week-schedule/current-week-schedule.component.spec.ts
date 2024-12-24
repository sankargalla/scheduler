import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeekScheduleComponent } from './current-week-schedule.component';

describe('CurrentWeekScheduleComponent', () => {
  let component: CurrentWeekScheduleComponent;
  let fixture: ComponentFixture<CurrentWeekScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentWeekScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentWeekScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
