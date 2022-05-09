import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTournamentComponent } from './current-tournament.component';

describe('CurrentTournamentComponent', () => {
  let component: CurrentTournamentComponent;
  let fixture: ComponentFixture<CurrentTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTournamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
