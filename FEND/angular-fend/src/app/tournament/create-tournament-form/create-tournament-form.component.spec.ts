import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournamentFormComponent } from './create-tournament-form.component';

describe('CreateTournamentFormComponent', () => {
  let component: CreateTournamentFormComponent;
  let fixture: ComponentFixture<CreateTournamentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTournamentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTournamentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
