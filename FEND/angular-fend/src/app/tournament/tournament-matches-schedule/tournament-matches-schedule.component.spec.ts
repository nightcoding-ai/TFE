import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentMatchesScheduleComponent } from './tournament-matches-schedule.component';

describe('TournamentMatchesScheduleComponent', () => {
  let component: TournamentMatchesScheduleComponent;
  let fixture: ComponentFixture<TournamentMatchesScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentMatchesScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentMatchesScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
